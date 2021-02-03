import Discord from 'discord.js'
import BaseEvent from '@src/abstractions/BaseEvent'
import CommandsExecutor from '@src/services/CommandsExecutor'

export default class MessageUpdateEventEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageUpdateEventEvent', {
      name: 'messageUpdate'
    })
  }

  execute(oldM: Discord.Message, newM: Discord.Message): any {
    // @ts-ignore
    if (oldM.repliedTo) newM.repliedTo = oldM.repliedTo

    const commandsExecutor = new CommandsExecutor(newM)

    return commandsExecutor.processCommand()
  }
}