import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'
import CommandsExecutor from '@/services/CommandsExecutor'

export default class MessageUpdateEventEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageUpdateEventEvent', {
      name: 'messageUpdate'
    })
  }

  execute(_: any, msg: Discord.Message): any {
    const commandsExecutor = new CommandsExecutor(msg)

    commandsExecutor.processCommand()
  }
}