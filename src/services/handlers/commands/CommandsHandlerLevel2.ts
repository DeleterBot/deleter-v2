import BaseService from '@src/abstractions/BaseService'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandsHandlerLevel3 from '@src/services/handlers/commands/CommandsHandlerLevel3'
import Info from '@src/types/Info'

export default class CommandsHandlerLevel2 extends BaseService {
  private readonly msg: DeleterCommandMessage
  private readonly guild: Guild
  private readonly command: BaseCommand
  private readonly info: Info

  constructor(msg: DeleterCommandMessage, guild: Guild, command: BaseCommand, info: Info) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.info = info
  }

  public handle() {

    if (this.command.disabled) return

    if (this.command.customPermissions) {
      if (this.command.customPermissions.includes('OWNER')) {
        if (!this.client.owner?.includes(this.msg.author.id)) return
      }
    }

    if (this.command.memberPermissions) {
      const isPermitted = this.msg.channel.permissionsFor(this.msg.author)?.has(this.command.memberPermissions)
      if (!isPermitted) return this.msg.reply('слы, нет')
    }

    if (this.command.clientPermissions) {
      const isPermitted = this.msg.channel.permissionsFor(this.msg.guild.me!)?.has(this.command.clientPermissions)
      if (!isPermitted) return this.msg.reply('слы, дай прав')
    }

    const commandsHandler = new CommandsHandlerLevel3(this.msg, this.guild, this.command, this.info)
    return commandsHandler.handle()

  }
}