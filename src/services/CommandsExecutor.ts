import BaseService from '@/abstractions/BaseService'
import Discord from 'discord.js'
import Guild from '@/structures/Guild'
import CommandsFinder from '@/utils/CommandsFinder'

export default class CommandsExecutor extends BaseService {
  public readonly msg: Discord.Message

  constructor(msg: Discord.Message) {
    super()
    this.msg = msg
  }

  async processCommand() {
    if (this.msg.author.bot) return
    if (this.msg.channel.type === 'dm') return

    const guildData = await this.client.db.get('guilds', this.msg.guild!.id)
    const guild = new Guild(this.msg.guild!, typeof guildData !== 'string' ? guildData : undefined)

    const commandsFinder = new CommandsFinder(this.client.cache.commands)

    let now = Date.now()
    let nowPrefix = `${now} `

    const mentionPrefix = this.msg.content.replace(
      new RegExp(String.raw`<@(!)?${this.client.user!.id}>( *)?`, 'i'), nowPrefix)
    const prefix =
      this.msg.content.startsWith(guild.prefix) ?
        guild.prefix :
        mentionPrefix.startsWith(nowPrefix) ?
          mentionPrefix.split(' ').shift() :
          false

    if (!prefix) return

    const content =
      prefix === nowPrefix.trim() ?
        mentionPrefix.slice(prefix.length + 1) :
        this.msg.content.slice(prefix.length)
    const args = content.split(/ +/)
    const maybeCommand = args.shift()?.toLowerCase()

    const Command = commandsFinder.find(maybeCommand as string, guild.lang.commands)
    if (Command) {
      // @ts-ignore
      const command = new Command()
      command.execute(this.msg)
    }
  }
}