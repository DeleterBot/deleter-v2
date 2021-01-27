import BaseCommand from '@/abstractions/BaseCommand'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import Info from '@/types/Info'
import Discord from 'discord.js'

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

  async execute(msg: Discord.Message, info: Info): Promise<CommandExecutionResult> {

    this.client.cache.commands.forEach(c => {

    })

    return new CommandExecutionResult(null)

  }
}