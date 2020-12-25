import 'module-alias/register'

import BaseService from '@/abstractions/BaseService'
import Discord from 'discord.js'

export default class CommandsExecutionService extends BaseService {
  private msg: Discord.Message

  constructor(msg: Discord.Message) {
    super()
    this.msg = msg
  }

  processCommand() {
    if (this.msg.author.bot) return
    if (this.msg.channel.type === 'dm') return

    if (this.client.owner.includes(this.msg.author.id)) {
      if (this.msg.content.startsWith('%e'))
        this.client.cache.commands.get('eval')?.execute(this.msg)
    }
  }
}