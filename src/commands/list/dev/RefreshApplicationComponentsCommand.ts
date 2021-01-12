import BaseCommand from '@/abstractions/BaseCommand'
import Discord from 'discord.js'
import Info from '@/types/Info'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import SubCommandsFinder from '@/utils/SubCommandsFinder'
import { execSync } from 'child_process'

export default class RefreshApplicationComponentsCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.dev.RefreshApplicationComponentsCommand', {
      name: 'refresh', hasSubCommands: true, overrideSubCommands: true,
      en: {
        name: 'refresh',
        aliases: [ 'r' ]
      },
      ru: {
        name: 'refresh',
        aliases: [ 'r' ]
      },
      gg: {
        name: 'refresh',
        aliases: [ 'r' ]
      },
      flags: {
        'compile': 'compile',
        'c': 'compile',
        'pull': 'pull',
        'p': 'pull'
      },
      customPermissions: [ 'OWNER' ]
    })
  }

  async execute(msg: Discord.Message, info: Info): Promise<CommandExecutionResult> {

    if (info.flags.pull) {
      await execSync('git pull')
    }

    if (info.flags.compile) {
      await msg.react('637956323958587392')
      await execSync('npm run build')
      await msg.reactions.cache.get('637956323958587392')?.users.remove(this.client.user!.id)
    }

    const subCommandsFinder = new SubCommandsFinder(this.client.cache.subCommands)

    async function execCommands(name: string, args: string[]): Promise<CommandExecutionResult | undefined> {
      const command = args[0]

      let result

      if (command) {
        const subCommand = subCommandsFinder.find(command, name, info.guild.lang.commands)
        if (subCommand) result = await subCommand.execute(msg, info)
      }

      if (args[1]) {
        args = args.slice(1)
        return execCommands(name, args)
      } else return result

    }

    if (info.subCommand) {
      const result = info.subCommand.execute(msg, info)
      if (info.args[0]) {
        return (await execCommands(this.name, info.args)) || result
      } else return result
    } else {
      return new CommandExecutionResult('не угадал').setReply()
    }

  }
}