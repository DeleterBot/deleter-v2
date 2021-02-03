import AbstractController from '@api/abstractions/abstract.controller'
import collectStatistics from '@api/utils/collectStatistics'
import Constants from '@api/utils/Constants'
import { Controller, Get, InternalServerErrorException } from '@nestjs/common'

@Controller(Constants.PUBLIC)
export default class PublicStatisticsController extends AbstractController {

  @Get('statistics')
  async execute() {

    if (!this.manager.shards.size)
      throw new InternalServerErrorException({
        message: 'shards haven\'t created yet'
      })

    return await collectStatistics(this.manager)

  }

}