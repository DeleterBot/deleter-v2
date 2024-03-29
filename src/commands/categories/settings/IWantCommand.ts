import BaseCommand from '@src/abstractions/BaseCommand'
import IWantCommandConfig from '@src/commands/categories/settings/resources/configs/IWantCommandConfig'
import { Message } from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class IWantCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.settings.IWantCommand', new IWantCommandConfig())
  }

  execute(msg: Message, context: CommandExecutionContext): CommandExecutionResult {
    return new CommandExecutionResult('command does not exist...')
  }
}
