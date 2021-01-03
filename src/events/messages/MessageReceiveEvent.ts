import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'
import CommandsExecutor from '@/services/CommandsExecutor'

export default class MessageReceiveEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageReceiveEvent', {
      name: 'message'
    })
  }

  execute(msg: Discord.Message): any {
    const commandsExecutor = new CommandsExecutor(msg)

    commandsExecutor.processCommand()
  }
}