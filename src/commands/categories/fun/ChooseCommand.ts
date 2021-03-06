import BaseCommand from '@src/abstractions/BaseCommand'
import ChooseCommandConfig from '@src/commands/categories/fun/resources/configs/ChooseCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class ChooseCommand extends BaseCommand {

  constructor() {
    super('@deleter.commands.categories.fun.ChooseCommand', new ChooseCommandConfig())
  }

  execute(msg: DeleterCommandMessage, context: CommandExecutionContext): CommandExecutionResult {

    return new CommandExecutionResult('cannot choose, sorry')

  }

}
