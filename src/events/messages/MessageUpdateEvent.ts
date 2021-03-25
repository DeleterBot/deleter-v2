import Discord from 'discord.js'
import BaseEvent from '@src/abstractions/BaseEvent'
import CommandsExecutor from '@src/services/CommandsExecutor'

export default class MessageUpdateEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageUpdateEvent', {
      name: 'messageUpdate'
    })
  }

  execute(oldM: Discord.Message, newM: Discord.Message): any {
    // @ts-ignore
    if (oldM.repliedTo) newM.repliedTo = oldM.repliedTo

    if (oldM.content === newM.content) return

    const commandsExecutor = new CommandsExecutor(newM)

    return commandsExecutor.processCommand()
  }
}
