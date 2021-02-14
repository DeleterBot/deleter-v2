import BaseCommand from '@src/abstractions/BaseCommand'
import Discord from 'discord.js'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import SubCommandsFinder from '@src/utils/SubCommandsFinder'
import { execSync } from 'child_process'
import { inspect } from 'util'
import RefreshApplicationComponentsCommandFlags
  from '@src/commands/list/dev/resources/flags/RefreshApplicationComponentsCommandFlags'

export default class RefreshApplicationComponentsCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.dev.RefreshApplicationComponentsCommand', {
      name: 'refresh', hasSubCommands: true, overrideSubCommands: true,
      en: {
        name: 'refresh',
        category: 'util',
        aliases: [ 'r' ]
      },
      ru: {
        name: 'refresh',
        category: 'утилиты',
        aliases: [ 'r' ]
      },
      gg: {
        name: 'refresh',
        category: 'хуетилиты',
        aliases: [ 'r' ]
      },
      flags: RefreshApplicationComponentsCommandFlags.default,
      customPermissions: [ 'OWNER' ]
    })
  }

  async execute(msg: Discord.Message, info: Info): Promise<CommandExecutionResult> {

    if (info.flags.pull) {
      await execSync('git pull')
    }

    if (info.flags.compile) {
      await msg.react('10:637956323958587392')
      await execSync('npm run build')
      await msg.reactions.cache.get('637956323958587392')?.users.remove(this.client.user!.id)
    }

    if (info.flags.everywhere && this.client.shard) {
      delete info.flags.complile
      delete info.flags.pull
      delete info.flags.everywhere

      const script = `
        delete require.cache[require.resolve('${this.path.replace(/\./g, '/')}')]
        
        const Command = require('${this.path.replace(/\./g, '/')}').default
        const command = new Command()
        
        const SubCommandsFinder = require('@src/utils/SubCommandsFinder').default
        const subCommandsFinder = new SubCommandsFinder(this.cache.subCommands)
        
        const info = {
          args: ${inspect(info.args)},
          flags: ${inspect(info.flags)},
          guild: {
            lang: ${inspect(info.guild.lang)}
          }
        }
        
        info.subCommand 
          = subCommandsFinder.find(${inspect(info.subCommand?.name)}, '${this.name}', '${info.guild.lang.commands}')
        
        command.execute({}, info)
      `

      const before = process.hrtime.bigint()
      const result = await this.client.shard.broadcastEval(script)
      const after = process.hrtime.bigint()

      const resultStr = 'Completed in '
      + (after - before) +
      ' nanoseconds or ' + (parseInt(String(after - before)) / 1000000).toFixed(3) + 'ms\n'
      + result.map((s, i) => `shard ${i}: ${s.result ?? s.name + ': ' + s.message}`).join('\n')

      return new CommandExecutionResult(resultStr).setOptions({ code: 'js' })
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
      if (info.args[1]) {
        return (await execCommands(this.name, info.args.slice(1))) || result
      } else return result
    } else {
      return new CommandExecutionResult('не угадал').setReply()
    }

  }
}
