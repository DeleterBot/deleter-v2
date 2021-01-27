import BaseService from '@/abstractions/BaseService'
import Guild from '@/structures/Guild'
import BaseCommand from '@/abstractions/BaseCommand'
import DeleterCommandMessage from '@/types/deleter/DeleterCommandMessage'
import CommandsHandlerLevel3 from '@/services/handlers/commands/CommandsHandlerLevel3'
import Info from '@/types/Info'

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