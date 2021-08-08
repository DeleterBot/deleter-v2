import BaseCommand from '@src/abstractions/BaseCommand'
import Discord from 'discord.js'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import SubCommandsFinder from '@src/utils/finders/SubCommandsFinder'
import { inspect } from 'util'
import environmentEval from '@src/utils/functions/environmentEval'
import RefreshApplicationComponentsCommandConfig
  from '@src/commands/categories/dev/resources/configs/RefreshApplicationComponentsCommandConfig'

export default class RefreshApplicationComponentsCommand extends BaseCommand {
  constructor() {
    super(
      '@deleter.commands.categories.dev.RefreshApplicationComponentsCommand',
      new RefreshApplicationComponentsCommandConfig()
    )
  }

  async execute(msg: Discord.Message, context: CommandExecutionContext): Promise<CommandExecutionResult> {

    if (context.flags.pull) {
      await environmentEval('git pull')
    }

    if (context.flags.compile) {
      await msg.react('10:637956323958587392')
      await environmentEval('npm run build')
      await msg.reactions.cache.get('637956323958587392')?.users.remove(this.deleter.user.id)
    }

    if (context.flags.everywhere && this.deleter.shard) {
      delete context.flags.complile
      delete context.flags.pull
      delete context.flags.everywhere

      const script = `
        delete require.cache[require.resolve('${this.path.replace(/\./g, '/')}')]
        
        const Command = require('${this.path.replace(/\./g, '/')}').default
        const command = new Command()
        
        const SubCommandsFinder = require('@src/utils/SubCommandsFinder').default
        const subCommandsFinder = new SubCommandsFinder(this.cache.subCommands)
        
        const info = {
          args: ${inspect(context.args)},
          flags: ${inspect(context.flags)},
          guild: {
            lang: ${inspect(context.guild.lang)}
          }
        }
        
        info.subCommand = subCommandsFinder
          .find(${inspect(context.subCommand?.name)}, '${this.name}', '${context.guild.lang.commands}')
        
        command.execute({}, info)
      `

      const before = process.hrtime.bigint()
      const result = await this.deleter.shard.broadcastEval(() => eval(script))
      const after = process.hrtime.bigint()

      const resultStr = 'Completed in '
      + (after - before) +
      ' nanoseconds or ' + (parseInt(String(after - before)) / 1000000).toFixed(3) + 'ms\n'
      + result.map((s, i) => `shard ${i}: ${s.result ?? s.name + ': ' + s.message}`).join('\n')

      return new CommandExecutionResult(resultStr)/*.setOptions({ code: 'js' })*/
    }

    const subCommandsFinder = new SubCommandsFinder(this.deleter.cache.subCommands)

    async function execCommands(name: string, args: string[]): Promise<CommandExecutionResult | undefined> {
      const command = args[0]

      let result

      if (command) {
        const subCommand = subCommandsFinder.find(command, name, context.guild.lang.commands)
        if (subCommand) result = await subCommand.execute(msg, context)
      }

      if (args[1]) {
        args = args.slice(1)
        return execCommands(name, args)
      } else return result

    }

    if (context.subCommand) {
      const result = context.subCommand.execute(msg, context)
      if (context.args[1]) {
        return (await execCommands(this.name, context.args.slice(1))) || result
      } else return result
    } else {
      return new CommandExecutionResult('не угадала').setReply()
    }

  }
}
