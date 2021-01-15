import BaseCommand from '@/abstractions/BaseCommand'
import Discord from 'discord.js'
import Info from '@/types/Info'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import SubCommandsFinder from '@/utils/SubCommandsFinder'

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

    return new CommandExecutionResult(null)

  }
}