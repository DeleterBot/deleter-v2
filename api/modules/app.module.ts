import MainController from '@api/controllers/main.controller'
import { Module } from '@nestjs/common'
import PublicModule from '@api/modules/public.module'
import PrivateModule from '@api/modules/private.module'
import Oauth2Module from '@api/modules/oauth2.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import IsShardsLoadedGuard from '@api/guards/is-shards-loaded.guard'
import ResponseSerializerInterceptor from '@api/interceptors/response.serializer.interceptor'
import { ThrottlerModule } from '@nestjs/throttler'
import RateLimitGuard from '@api/guards/rate-limit.guard'

@Module({
  imports: [
    PublicModule,
    PrivateModule,
    Oauth2Module,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  controllers: [ MainController ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
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
