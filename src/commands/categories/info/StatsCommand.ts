import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import Discord from 'discord.js'
import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/parsers/StringPropertiesParser'
import { hostname } from 'os'
import Moment from 'moment'
import Constants from '@src/utils/other/Constants'
import StatsCommandConfig from '@src/commands/categories/info/resources/configs/StatsCommandConfig'
import DeleterEmbed from '@src/structures/DeleterEmbed'
import StatsCommandDto from '@src/commands/categories/info/resources/dto/StatsCommandDto'

export default class StatsCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.info.StatsCommand', new StatsCommandConfig())
  }

  async execute(
    msg: DeleterCommandMessage,
    context: CommandExecutionContext<StatsCommandDto>
  ): Promise<CommandExecutionResult> {

    this.logger.info(undefined, context.dto.a1)

    const parser = new StringPropertiesParser(),
      root = `${context.guild.lang.interface}.deleter.commands.categories.info.command.stats`,
      pckg: Record<string, any> = require('@root/package.json'),
      unknown = parser.parse(`$keyword[${context.guild.lang.interface}.deleter.global.unknown]`)

    const data: any = await this.deleter.shard?.broadcastEval(client => {
      return [
        ~~(process.memoryUsage().heapUsed / 1024 ** 2),
        ~~(process.memoryUsage().rss / 1024 ** 2),
        client.guilds.cache.size,
        client.users.cache.size
      ]
    }).catch(() => null)

    let memUsageTotal = data?.reduce((a: any, b: any) => { return [ a[0] + b[0], a[1] + b[1] ] })
    if (!memUsageTotal) memUsageTotal = [ unknown, unknown ]

    let guildsCount = data?.reduce((a: any, b: any) => (a[2] ?? a) + (b[2] ?? b), 0)
    if (!guildsCount) guildsCount = unknown

    let usersCount = data?.reduce((a: any, b: any) => (a[3] ?? a) + (b[3] ?? b), 0)
    if (!usersCount) usersCount = unknown

    const memUsageShard
      = [ ~~(process.memoryUsage().heapUsed / 1024 ** 2), ~~(process.memoryUsage().rss / 1024 ** 2) ]

    Moment.locale(Constants.localeLang(context.guild.lang.interface))
    const uptime = Moment().to(Moment(Date.now() - process.uptime() * 1000))

    let description = ''

    description += parser.parse(
      `$phrase[${root}.description.part1]`,
      {
        version: pckg.version,
        lib: `discord.js ${Discord.version}`,
        memUsageTotalHeap: memUsageTotal[0],
        memUsageTotalRss: memUsageTotal[1],
        memUsageShardHeap: memUsageShard[0],
        memUsageShardRss: memUsageShard[1],
        uptime: uptime,
        guildsCount: guildsCount,
        usersCount: usersCount,
        ping: this.deleter.ws.ping,
        commandsExecuted: unknown,
        shard: msg.guild.shardId + 1,
        totalShards: this.deleter.shard?.count ?? 0
      }
    )

    if ((this.deleter.shard?.count ?? 0) > 1) description += '\n\n' + parser.parse(
      `$phrase[${root}.description.part2]`,
      {
        memUsageShardHeap: memUsageShard[0],
        memUsageShardRss: memUsageShard[1]
      }
    )

    description += '\n\n' + parser.parse(
      `$phrase[${root}.description.part3]`,
      {
        uptime: uptime,
        guildsCount: guildsCount,
        usersCount: usersCount,
        ping: this.deleter.ws.ping,
        commandsExecuted: unknown,
        shard: msg.guild.shardId + 1,
        totalShards: this.deleter.shard?.count ?? 0
      }
    )

    const footer = parser.parse(
      `$phrase[${root}.footer.value]`,
      {
        hostname: hostname()
      }
    )

    const embed = new DeleterEmbed()
      .setColor(context.guild.color)
      .setDescription(description)
      .setThumbnail(this.deleter.user.displayAvatarURL({ size: 256, format: 'png' }))
      .setFooter(footer)

    return new CommandExecutionResult(embed)

  }
}
