import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import AuthGuard from '@api/guards/auth.guard'

@Injectable()
export default class StrictAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.headers.authorization)
      throw new UnauthorizedException()


    if (typeof request.headers.authorization !== 'string') {
      throw new ForbiddenException({
        message: 'authorization header must be string'
      })
    }

    request.user = await super.validateToken(request.headers.authorization, true)

    return true
  }
}