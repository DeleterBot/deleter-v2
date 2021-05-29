import BaseCommand from '@src/abstractions/BaseCommand'
import DivineCountryCommandConfig from '@src/commands/categories/fun/resources/configs/DivineCountryCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'

export default class DivineCountryCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.games.DivineCountryCommand', new DivineCountryCommandConfig())
  }

  async execute(msg: DeleterCommandMessage, context: CommandExecutionContext): Promise<CommandExecutionResult> {

    return new Promise((res, rej) => {

    })

  }
}
