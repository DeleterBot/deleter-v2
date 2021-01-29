import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'

export default class HelpCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.HelpCommand', {
      name: 'help',
      en: {
        name: 'help',
        category: 'moderation'
      },
      ru: {
        name: 'хелп',
        category: 'модерация',
        aliases: [ 'помощь' ]
      },
      gg: {
        name: 'хуелп',
        category: 'модерейшн',
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