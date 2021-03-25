import MainController from '@api/controllers/main.controller'
import { Module } from '@nestjs/common'
import PublicModule from '@api/modules/public.module'
import PrivateModule from '@api/modules/private.module'
import Oauth2Module from '@api/modules/oauth2.module'
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import IsShardsLoadedGuard from '@api/guards/is-shards-loaded.guard'
import ResponseSerializerInterceptor from '@api/interceptors/response.serializer.interceptor'

@Module({
  imports: [
    PublicModule,
    PrivateModule,
    Oauth2Module,
    RateLimiterModule.register({
      for: 'Fastify',
    }),
  ],
  controllers: [ MainController ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSerializerInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: IsShardsLoadedGuard
    },
  ],
})
export default class AppModule {}
