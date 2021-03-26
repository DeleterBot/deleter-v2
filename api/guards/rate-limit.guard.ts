/**
 * @note this part of the project code was taken from the open source library "nestjs/throttler" and has been modified.
 * @see https://github.com/nestjs/throttler
 * */

import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler'
import { ExecutionContext } from '@nestjs/common'
import keyGenerator from '@api/utils/keyGenerator'

export default class RateLimitGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    // Here we start to check the amount of requests being done against the ttl.
    const { req, res } = this.getRequestResponse(context)

    // Return early if the current user agent should be ignored.
    if (Array.isArray(this.options.ignoreUserAgents)) {
      for (const pattern of this.options.ignoreUserAgents) {
        if (pattern.test(req.headers['user-agent'])) {
          return true
        }
      }
    }

    const key = this.generateKey(context, keyGenerator(req))
    const ttls = await this.storageService.getRecord(key)
    const nearestExpiryTime = ttls.length > 0 ? Math.ceil((ttls[0] - Date.now()) / 1000) : 0

    // Throw an error when the user reached their limit.
    if (ttls.length >= limit) {
      res.header('Retry-After', nearestExpiryTime)
      throw new ThrottlerException(this.errorMessage)
    }

    res.header(`${this.headerPrefix}-Limit`, limit)
    // We're about to add a record so we need to take that into account here.
    // Otherwise the header says we have a request left when there are none.
    res.header(`${this.headerPrefix}-Remaining`, Math.max(0, limit - (ttls.length + 1)))
    res.header(`${this.headerPrefix}-Reset`, nearestExpiryTime)

    await this.storageService.addRecord(key, ttl)
    return true
  }
}
