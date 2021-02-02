import MainController from '@api/controllers/main.controller'
import { Module } from '@nestjs/common'
import PublicModule from '@api/modules/public.module'
import PrivateModule from '@api/modules/private.module'
import Oauth2Module from '@api/modules/oauth2.module'

@Module({
  imports: [ PublicModule, PrivateModule, Oauth2Module ],
  controllers: [ MainController ]
})
export default class AppModule {}