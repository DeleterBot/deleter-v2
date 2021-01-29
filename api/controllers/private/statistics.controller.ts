import AbstractController from '@api/abstractions/abstract.controller'
import collectStatistics from '@api/utils/collectStatistics'
import Constants from '@api/utils/Constants'
import {
  Controller,
  ForbiddenException,
  Get,
  Headers,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

@Controller(Constants.PREFIX + Constants.PRIVATE)
export default class PrivateStatisticsController extends AbstractController {

  @Get('statistics')
  async execute(@Headers('authorization') authorization: string | undefined) {

    throw new NotFoundException()

    if (authorization !== process.env.API_PRIVSTATS_PSWD)
      throw new ForbiddenException()

    if (!this.manager.shards.size)
      throw new InternalServerErrorException({
        message: 'shards haven\'t created yet'
      })

    const commandsScript = `this.db.get('commands', '', { array: true, everything: true })`

    const stats = await collectStatistics(this.manager),
      commands = await this.manager.shards.first()!.eval(commandsScript)

  }

}