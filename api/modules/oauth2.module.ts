import { Module } from '@nestjs/common'
import TokenController from '@api/controllers/oauth2/token.controller'

@Module({
  controllers: [ TokenController ]
})
export default class Oauth2Module {}