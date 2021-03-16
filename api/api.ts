/**
 * The Deleter API is a RESTful API based on HTTP(s) requests and JSON responses.
 *
 * @author Mirdukkk
 */

import DeleterApiWorker from '@api/structures/DeleterApiWorker'
import Discord from 'discord.js'
import { FastifyRequest } from 'fastify'
import FastifyCors from 'fastify-cors'
import FastifyRateLimit from 'fastify-rate-limit'

export default function api(manager: Discord.ShardingManager) {

  const api = new DeleterApiWorker(manager, process.env.API_PORT, process.env.API_HOST)

  return api.start(
    undefined,
    [ FastifyCors, { origin: true } ],
    [ FastifyRateLimit, {
      global: false,
      max: 100,
      timeWindow: 3 * 60 * 1000,
      cache: 5000,
      keyGenerator: (req: FastifyRequest) => {
        return req.headers?.['cf-connecting-ip'] ||
          req.headers?.['x-forwarded-for'] ||
          req.socket.remoteAddress
      },
      addHeaders: {
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true,
        'retry-after': true
      }
    } ]
  )

}
