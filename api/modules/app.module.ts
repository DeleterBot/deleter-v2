import MainController from '@api/controllers/main.controller'
import PrivateStatisticsController from '@api/controllers/private/statistics.controller'
import CommandsController from '@api/controllers/public/commands.controller'
import PublicStatisticsController from '@api/controllers/public/statistics.controller'
import { Module } from '@nestjs/common'
import TokenController from '@api/controllers/oauth2/token.controller'

@Module({
  controllers: [
    MainController,
    PublicStatisticsController,
    PrivateStatisticsController,
    CommandsController,
    TokenController
  ]
})
export default class AppModule {}