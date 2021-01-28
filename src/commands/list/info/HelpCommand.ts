import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class HelpCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.HelpCommand', {
      name: 'help',
      en: {
        name: 'help'
      },
      ru: {
        name: 'хелп',
        aliases: [ 'помощь' ]
      },
      gg: {
        name: 'хуелп',
        aliases: [ 'хуёмощь', 'хелп', 'помощь' ]
      }
    })
  }

  async execute(/*msg: Discord.Message, info: Info*/): Promise<CommandExecutionResult> {

    /*this.client.cache.commands.forEach(c => {

    })*/

    return new CommandExecutionResult(null)

  }
}