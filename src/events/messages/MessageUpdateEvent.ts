import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'
import CommandsExecutionService from '@/services/CommandsExecutionService'

export default class MessageUpdateEventEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageUpdateEventEvent', {
      name: 'messageUpdate'
    })
  }

  execute(msg: Discord.Message): any {
    const commandsExecutionService = new CommandsExecutionService(msg)

    commandsExecutionService.processCommand()
  }
}