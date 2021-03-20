import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'

export default class HelpCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.HelpCommand', {
      name: 'help', multiLang: true,
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

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {



    return new CommandExecutionResult('хелпа нет, иди ты нахер').setReply()

  }

  private standard(msg: DeleterCommandMessage, info: Info) {

    const commands: Record<string, Array<string>> = {}

    this.client.cache.commands.forEach(command => {

      const category = command[info.guild.lang.interface].category

      if (!commands[category]) commands[category] = []

      commands[category].push(command[info.guild.lang.commands])

    })

  }
}
