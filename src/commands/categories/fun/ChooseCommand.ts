import BaseCommand from '@src/abstractions/BaseCommand'
import ChooseCommandConfig from '@src/commands/categories/fun/resources/configs/ChooseCommandConfig'
import { Message } from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class ChooseCommand extends BaseCommand {

  constructor() {
    super('@deleter.commands.categories.fun.ChooseCommand', new ChooseCommandConfig())
  }

  execute(msg: Message, context: CommandExecutionContext): CommandExecutionResult {

    return new CommandExecutionResult('cannot choose, sorry')

  }

}
