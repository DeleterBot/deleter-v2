import BaseCommand from '@src/abstractions/BaseCommand'
import IWantCommandConfig from '@src/commands/categories/settings/resources/configs/IWantCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class IWantCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.settings.IWantCommand', new IWantCommandConfig())
  }

  execute(msg: DeleterCommandMessage, info: Info): CommandExecutionResult {
    return new CommandExecutionResult('command does not exist...')
  }
}
