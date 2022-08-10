import { MessageCreateEventContext } from 'discordoo'
import BaseEvent from '@src/abstractions/BaseEvent'
import CommandsExecutor from '@src/services/CommandsExecutor'

export default class MessageReceiveEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.messages.MessageReceiveEvent', {
      name: 'messageCreate'
    })
  }

  execute(ctx: MessageCreateEventContext): any {
    const commandsExecutor = new CommandsExecutor(ctx.message)

    return commandsExecutor.processCommand()
  }
}
