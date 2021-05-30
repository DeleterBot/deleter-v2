import BaseService from '@src/abstractions/BaseService'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandsHandlerLevel4 from '@src/services/handlers/commands/CommandsHandlerLevel4'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import commandLineArgs from 'command-line-args'
import SubCommandsFinder from '@src/utils/finders/SubCommandsFinder'
import CommandLanguage from '@src/types/commands/CommandLanguage'
import CommandsHandlerLevel2 from '@src/services/handlers/commands/CommandsHandlerLevel2'

/*
 additional parsing: parsing flags and resolving subCommands
 if subCommand detected - execution starting from CommandsHandlerLevel2
 */
export default class CommandsHandlerLevel3 extends BaseService {
  private readonly msg: DeleterCommandMessage
  private readonly guild: Guild
  public command: BaseCommand
  public context: CommandExecutionContext

  constructor(msg: DeleterCommandMessage, guild: Guild, command: BaseCommand, context: CommandExecutionContext) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.context = context
  }

  public handle(mode = 'process'): any {

    const subCommandsFinder = new SubCommandsFinder(this.deleter.cache.subCommands)

    const commandFlags =
      this.command.translations[this.guild.lang.commands as CommandLanguage].flags && this.command.flags
        ? Object.assign(
        Object.create(this.command.translations[this.guild.lang.commands as CommandLanguage].flags as Record<any, any>),
        Object.create(this.command.flags)
        )
        : this.command.translations[this.guild.lang.commands as CommandLanguage].flags || this.command.flags

    if (commandFlags) {
      this.context.flags = {}

      const args: commandLineArgs.OptionDefinition[] = []
      const commandsFlagsEntries: Array<[string, Record<string, any> | string]> = Object.entries(commandFlags)

      commandsFlagsEntries.forEach(flag => {
        const flagKey = flag[0], flagValue: Record<string, any> | string = flag[1]

        switch (typeof flagValue) {
          case 'string':
            args.push({
              name: flagKey,
              type: Boolean,
              multiple: true
            })
            break
          case 'object':
            args.push({
              name: flagKey,
              type: flagValue.type ?? Boolean,
              alias: flagValue.alias,
              defaultValue: flagValue.default ?? false,
              multiple: true
            })
            break
        }
      })

      const parsedFlags = commandLineArgs(args, {
        argv: this.context.args,
        partial: true
      })

      const flags: Record<string, any> = {}

      if (parsedFlags._unknown) {
        this.context.args = parsedFlags._unknown
        delete parsedFlags._unknown
      }

      Object.entries(parsedFlags).forEach(flag => {
        const flagKey = flag[0]

        const commandFlag = commandFlags[flagKey]

        switch (typeof commandFlag) {
          case 'object':
            flags[commandFlag.name] = flag[1][0]
            break
          case 'string':
            flags[commandFlag] = flag[1][0]
            break
        }
      })

      Object.assign(this.context.flags, flags)
    }

    if (this.command.hasSubCommands && this.context.args[0]) {
      const subCommand =
        subCommandsFinder.find(this.context.args[0].toLowerCase(), this.command.name, this.guild.lang.commands)

      if (!this.command.overrideSubCommands) {
        if (subCommand) this.command = subCommand as unknown as BaseCommand
        mode = 'this'
        this.context.args = this.context.args.slice(1)
      } else this.context.subCommand = subCommand!
    }

    if (mode === 'process') {
      const commandsHandler = new CommandsHandlerLevel4(this.msg, this.guild, this.command, this.context)
      return commandsHandler.handle()
    } else if (mode === 'this') {
      const commandsHandler = new CommandsHandlerLevel2(this.msg, this.guild, this.command, this.context)
      return commandsHandler.handle()
    }

    return this

  }
}
