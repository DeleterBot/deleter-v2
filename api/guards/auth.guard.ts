import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  HttpException
} from '@nestjs/common'
import AbstractGuard from '@api/abstractions/abstract.guard'
import RequestUser from '@api/types/request.user'
import Constants from '@api/utils/Constants'
import generateHash from '@api/utils/generateHash'
import getDiscordUser from '@api/utils/getDiscordUser'

@Injectable()
export default class AuthGuard extends AbstractGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.headers.authorization)
      throw new UnauthorizedException()


    if (typeof request.headers.authorization !== 'string') {
      throw new ForbiddenException({
        message: 'authorization header must be string'
      })
    }

    request.user = await this.validateToken(request.headers.authorization, false)

    return true
  }

  async validateToken(authorization: string, strict: boolean): Promise<RequestUser> {
    const [ type, token, id ] = authorization.split(' ')

    if (!type || !token || !id) throw new ForbiddenException({
      message: 'invalid authorization provided'
    })

    if (!Constants.tokenTypes.includes(type)) throw new ForbiddenException({
      message: 'the type of token does not exist',
      code: Constants.codes.TOKEN_TYPE_NOT_EXISTS
    })

    if (id.length > 19 || id.length < 17) throw new ForbiddenException({
      message: 'user id is invalid'
    })

    const user: Record<string, any> = await this.db.get(Constants.hashesTable, id)
    if (!user) throw new ForbiddenException({
      message: 'user never was authorized in this API',
      code: Constants.codes.NEVER_AUTHORIZED
    })

    /*if (Date.now() >= user.expires_timestamp) throw new ForbiddenException({
      message: 'token outdated',
      code: Constants.codes.TOKEN_OUTDATED
    })*/

    const hash = generateHash(token)
    if (hash !== user.access_token) throw new ForbiddenException({
      message: 'token invalid',
      code: Constants.codes.TOKEN_INVALID
    })

    if (strict) {
      try {
        await getDiscordUser(type, token)
      } catch (e) {
        throw new HttpException({
          message: 'Discord authorization check failed with ' + e.statusCode
        }, 500)
      }
    }

    return {
      token: token,
      tokenType: type,
      id: id
    }
  }
}