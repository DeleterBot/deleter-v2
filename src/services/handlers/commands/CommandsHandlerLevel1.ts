import Discord from 'discord.js'
import Guild from '@/structures/Guild'
import BaseService from '@/abstractions/BaseService'
import CommandsFinder from '@/utils/CommandsFinder'
import CommandsHandlerLevel2 from '@/services/handlers/commands/CommandsHandlerLevel2'
import DeleterCommandMessage from '@/types/deleter/DeleterCommandMessage'
import Info from '@/types/Info'

export default class CommandsHandlerLevel1 extends BaseService {
  private readonly msg: Discord.Message
  private readonly guild: Guild
  private readonly info: Info

  constructor(msg: Discord.Message, guild: Guild) {
    super()
    this.msg = msg
    this.guild = guild
    this.info = {} as Info
  }

  public handle() {
    const commandsFinder = new CommandsFinder(this.client.cache.commands)

    let now = Date.now()
    let nowPrefix = `${now} `

    const mentionPrefix = this.msg.content.replace(
      new RegExp(String.raw`<@(!)?${this.client.user!.id}>( *)?`, 'i'), nowPrefix)
    const prefix =
      this.msg.content.startsWith(this.guild.prefix) ?
        this.guild.prefix :
        mentionPrefix.startsWith(nowPrefix) ?
          mentionPrefix.split(' ').shift() :
          false

    if (!prefix) return

    const content =
      prefix === nowPrefix.trim() ?
        mentionPrefix.slice(prefix.length + 1) :
        this.msg.content.slice(prefix.length)
    let args = content.split(/ +/)
    const maybeCommand = args.shift()?.toLowerCase()

    let command = commandsFinder.find(maybeCommand as string, this.guild.lang.commands)
    if (command) {

      this.info.guild = this.guild
      this.info.args = args
      this.info.flags = {}

      const commandsHandler = new CommandsHandlerLevel2(
        this.msg as DeleterCommandMessage,
        this.guild,
        command,
        this.info
      )
      return commandsHandler.handle()
    }
  }
}