import BaseCommand from '@src/abstractions/BaseCommand'
import DivineCountryCommandConfig from '@src/commands/list/fun/resources/configs/DivineCountryCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Info from '@src/types/Info'

export default class DivineCountryCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.games.DivineCountryCommand', new DivineCountryCommandConfig())
  }

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {

    return new Promise((res, rej) => {

    })

  }
}
