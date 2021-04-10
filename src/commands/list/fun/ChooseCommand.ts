import BaseCommand from '@src/abstractions/BaseCommand'
import ChooseCommandConfig from '@src/commands/list/fun/resources/configs/ChooseCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class ChooseCommand extends BaseCommand {

  constructor() {
    super('@deleter.commands.list.fun.ChooseCommand', new ChooseCommandConfig())
  }

  execute(msg: DeleterCommandMessage, info: Info): CommandExecutionResult {

    return new CommandExecutionResult('cannot choose, sorry')

  }

}
