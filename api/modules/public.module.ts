import { Module } from '@nestjs/common'
import PublicStatisticsController from '@api/controllers/public/statistics.controller'
import CommandsController from '@api/controllers/public/commands.controller'

@Module({
  controllers: [ PublicStatisticsController, CommandsController ]
})
export default class PublicModule {}