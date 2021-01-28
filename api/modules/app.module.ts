import MainController from '@api/controllers/main.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [ MainController ]
})
export default class AppModule {}