import { Module } from '@nestjs/common'
import PrivateStatisticsController from '@api/controllers/private/statistics.controller'

@Module({
  controllers: [ PrivateStatisticsController ]
})
export default class PrivateModule {}