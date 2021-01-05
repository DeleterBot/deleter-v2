import BaseService from '@/abstractions/BaseService'
import Discord from 'discord.js'
import Guild from '@/structures/Guild'

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

    if (this.client.owner.includes(this.msg.author.id)) {
      if (this.msg.content.startsWith(guild.prefix + 'e'))
        this.client.cache.commands.get('eval')?.execute(this.msg)
    }
  }
}