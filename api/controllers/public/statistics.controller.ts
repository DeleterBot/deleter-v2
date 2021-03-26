import AbstractController from '@api/abstractions/abstract.controller'
import collectStatistics from '@api/utils/collectStatistics'
import Constants from '@api/utils/Constants'
import { Controller, Get } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

@Controller(Constants.PUBLIC)
export default class PublicStatisticsController extends AbstractController {

  @Get('statistics')
  @Throttle(20, 60)
  async execute() {

    return await collectStatistics(this.manager)

  }

}
