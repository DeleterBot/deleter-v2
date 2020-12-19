import 'module-alias/register'
import BaseCommand from '@/base/BaseCommand'
import Discord from 'discord.js'

export default class EvalCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.dev.EvalCommand', {
      name: 'eval'
    })
  }

  execute(msg: Discord.Message): any {
    msg.reply('lol, works')
  }
}