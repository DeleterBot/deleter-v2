import AbstractController from '@api/abstractions/abstract.controller'
import collectStatistics from '@api/utils/collectStatistics'
import Constants from '@api/utils/Constants'
import { Controller, Get } from '@nestjs/common'
import { RateLimit } from 'nestjs-rate-limiter'

@Controller(Constants.PUBLIC)
export default class PublicStatisticsController extends AbstractController {

  @Get('statistics')
  @RateLimit({ keyPrefix: 'stats', points: 15, duration: 60 })
  async execute() {

    return await collectStatistics(this.manager)

  }

}
