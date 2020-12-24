import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'
import CommandsExecutionService from '@/services/CommandsExecutionService'

export default class MessageReceiveEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageReceiveEvent', {
      name: 'message'
    })
  }

  execute(msg: Discord.Message): any {
    const commandsExecutionService = new CommandsExecutionService(msg)

    commandsExecutionService.processCommand()
  }
}