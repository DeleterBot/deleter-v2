import BaseService from '@src/abstractions/BaseService'
import { Message } from 'discordoo'
import Guild from '@src/structures/Guild'
import CommandsHandlerLevel1 from '@src/services/handlers/commands/CommandsHandlerLevel1'
import DeleterGuild from '@src/structures/djs/DeleterGuild'

export default class CommandsExecutor extends BaseService {
  public readonly msg: Message

  constructor(msg: Message) {
    super()
    this.msg = msg
  }

  async processCommand() {
    const author = await this.msg.author(), guild = await this.msg.guild()
    if (!author || author.bot) return
    if (!guild) return

    const guildData = await this.deleter.db.get('guilds', guild.id)
    const g = new Guild(guild as DeleterGuild, typeof guildData !== 'string' ? guildData : undefined)

    const commandsHandler = new CommandsHandlerLevel1(this.msg, g)
    return commandsHandler.handle()
  }
}
