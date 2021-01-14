import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'
import CommandsExecutor from '@/services/CommandsExecutor'

export default class MessageUpdateEventEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageUpdateEventEvent', {
      name: 'messageUpdate'
    })
  }

  execute(oldM: Discord.Message, newM: Discord.Message): any {
    // @ts-ignore
    if (oldM.replyedTo) newM.replyedTo = oldM.replyedTo

    const commandsExecutor = new CommandsExecutor(newM)

    return commandsExecutor.processCommand()
  }
}