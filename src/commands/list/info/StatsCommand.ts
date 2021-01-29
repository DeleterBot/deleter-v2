import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import Discord from 'discord.js'
import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import { hostname } from 'os'

export default class StatsCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.StatsCommand', {
      name: 'stats',
      ru: {
        name: 'стата',
        category: 'информация'
      },
      en: {
        name: 'stats',
        category: 'information'
      },
      gg: {
        name: 'хуята',
        category: 'информейшн'
      }
    })
  }

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {

    const parser = new StringPropertiesParser(),
      root = `${info.guild.lang.interface}.deleter.commands.list.info.command.stats`,
      pckg: Record<string, any> = require('@root/package.json'),
      unknown = parser.parse(`$keyword[${info.guild.lang.interface}.deleter.global.unknown]`)

    const data = await this.client.shard?.broadcastEval(
      `[ 
         ~~(process.memoryUsage().heapUsed / 1024 ** 2), 
         ~~(process.memoryUsage().rss / 1024 ** 2), 
         this.guilds.cache.size,
         this.users.cache.size
       ]`
    ).catch(() => null)

    let memUsageTotal = data?.reduce((a, b) => { return [ a[0] + b[0], a[1] + b[1] ] })
    if (!memUsageTotal) memUsageTotal = [ unknown, unknown ]

    let guildsCount = data?.reduce((a, b) => (a[2] ?? a) + (b[2] ?? b))
    if (!guildsCount) guildsCount = unknown

    let usersCount = data?.reduce((a, b) => (a[3] ?? a) + (b[3] ?? b))
    if (!usersCount) usersCount = unknown

    const memUsageShard
      = [ ~~(process.memoryUsage().heapUsed / 1024 ** 2), ~~(process.memoryUsage().rss / 1024 ** 2) ]

    const description = parser.parse(
      `$phrase[${root}.description]`,
      {
        version: pckg.version,
        djs: `discord.js ${Discord.version}`,
        memUsageTotalHeap: memUsageTotal[0],
        memUsageTotalRss: memUsageTotal[1],
        memUsageShardHeap: memUsageShard[0],
        memUsageShardRss: memUsageShard[1],
        uptime: 'понятия не имею',
        guildsCount: guildsCount,
        usersCount: usersCount,
        ping: this.client.ws.ping,
        commandsExecuted: unknown,
        shard: msg.guild.shardID + 1,
        totalShards: this.client.shard!.count
      }
    ), footer = parser.parse(
      `$phrase[${root}.footer.value]`,
      {
        hostname: hostname()
      }
    )

    const embed = new Discord.MessageEmbed()
      .setColor(info.guild.color)
      .setDescription(description)
      .setThumbnail(this.client.user!.displayAvatarURL({ size: 256, format: 'png' }))
      .setFooter(footer)

    return new CommandExecutionResult(embed)

  }
}