import MainController from '@api/controllers/main.controller'
import { Module } from '@nestjs/common'
import PublicModule from '@api/modules/public.module'
import PrivateModule from '@api/modules/private.module'
import Oauth2Module from '@api/modules/oauth2.module'
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [ PublicModule, PrivateModule, Oauth2Module, RateLimiterModule ],
  controllers: [ MainController ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export default class AppModule {}
