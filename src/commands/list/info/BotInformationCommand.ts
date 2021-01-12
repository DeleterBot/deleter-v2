import BaseCommand from '@/abstractions/BaseCommand'
import Discord from 'discord.js'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import Info from '@/types/Info'

export default class BotInformationCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.BotInformationCommand', {
      name: 'info',
      ru: {
        name: 'инфо'
      },
      en: {
        name: 'info'
      },
      gg: {
        name: 'инфа'
      },
      clientPermissions: [ 'EMBED_LINKS' ]
    })
  }

  execute(msg: Discord.Message, info: Info): CommandExecutionResult | Promise<CommandExecutionResult> {

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(this.client.user!.username)


    return new CommandExecutionResult(embed)
  }
}