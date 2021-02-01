import AbstractController from '@api/abstractions/abstract.controller'
import collectStatistics from '@api/utils/collectStatistics'
import Constants from '@api/utils/Constants'
import {
  Controller,
  Get,
  InternalServerErrorException, Req,
  UseGuards,
} from '@nestjs/common'
import AuthGuard from '@api/guards/auth.guard'
import AuthorizedRequest from '@api/types/authorized.request'

@Controller(Constants.PREFIX + Constants.PRIVATE)
export default class PrivateStatisticsController extends AbstractController {

  @Get('statistics')
  @UseGuards(new AuthGuard())
  async execute(@Req() req: AuthorizedRequest) {

    console.log(req.user)

    if (!this.manager.shards.size)
      throw new InternalServerErrorException({
        message: 'shards haven\'t created yet'
      })

    const commandsScript = `this.db.get('commands', '', { array: true, everything: true })`

    const { shards, totalGuilds, totalUsers } = await collectStatistics(this.manager)
    let commands: Array<Record<string, number | string>> = await this.manager.shards.first()!.eval(commandsScript)

    commands = commands.sort((a, b) => {
      if (a.count > b.count) {
        return -1
      }
      if (a.count < b.count) {
        return 1
      }
      return 0
    })

    let commandsUsage = ''

    for (const command of commands) {
      if(command._id !== 'globalCount_')
        commandsUsage += `commands_usage{name="${command._id}"} ${command.count}\n`
    }

    let ping = 0
    shards.forEach((s: Record<string, any>) => {
      ping += s.ping
    })
    ping = ping / shards.length

    let result = ''

    result += '# HELP total_shards Number of bot shards.\n'
    result += '# TYPE total_shards summary\n'
    result += `total_shards ${shards.length}\n`
    result += '# HELP inactive_shards Number of bot inactive shards.\n'
    result += '# TYPE inactive_shards summary\n'
    result += `inactive_shards ${shards.filter((s: any) => !s.ready).length}\n`
    result += '# HELP total_users Number of bot users.\n'
    result += '# TYPE total_users summary\n'
    result += `total_users ${totalUsers}\n`
    result += '# HELP total_guilds Number of bot guilds.\n'
    result += '# TYPE total_guilds summary\n'
    result += `total_guilds ${totalGuilds}\n`
    result += '# HELP average_ping Average ping on shards.\n'
    result += '# TYPE average_ping summary\n'
    result += `average_ping ${ping}\n`
    result += '# HELP commands_usage Commands usage.\n'
    result += '# TYPE commands_usage summary\n'
    result += commandsUsage
    
    return result

  }

}