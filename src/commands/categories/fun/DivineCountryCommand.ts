import BaseCommand from '@src/abstractions/BaseCommand'
import DivineCountryCommandConfig from '@src/commands/categories/fun/resources/configs/DivineCountryCommandConfig'
import { Message } from 'discordoo'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'

export default class DivineCountryCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.fun.DivineCountryCommand', new DivineCountryCommandConfig())
  }

  async execute(msg: Message, context: CommandExecutionContext): Promise<CommandExecutionResult> {

    return new CommandExecutionResult('netu')

  }
}
