import AbstractController from '@api/abstractions/abstract.controller'
import collectStatistics from '@api/utils/collectStatistics'
import Constants from '@api/utils/Constants'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { RateLimit } from 'nestjs-rate-limiter'
import IsShardsLoadedGuard from '@api/guards/is-shards-loaded.guard'

@Controller(Constants.PUBLIC)
export default class PublicStatisticsController extends AbstractController {

  @Get('statistics')
  @UseGuards(new IsShardsLoadedGuard())
  @RateLimit({ keyPrefix: 'stats', points: 15, duration: 60 })
  async execute() {

    return await collectStatistics(this.manager)

  }

}
