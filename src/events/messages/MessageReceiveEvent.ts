import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'

export default class MessageReceiveEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageReceiveEvent', {
      name: 'message'
    })
  }

  execute(msg: Discord.Message): any {
    if (this.client.owner.includes(msg.author.id) && msg.content.startsWith('!lol'))
      this.client.cache.commands.get('eval')?.execute(msg)
  }
}