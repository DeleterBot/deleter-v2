import BaseService from '@/abstractions/BaseService'
import Guild from '@/structures/Guild'
import BaseCommand from '@/abstractions/BaseCommand'
import DeleterCommandMessage from '@/types/deleter/DeleterCommandMessage'
import CommandsHandlerLevel4 from '@/services/handlers/commands/CommandsHandlerLevel4'
import Info from '@/types/Info'
import commandLineArgs from 'command-line-args'
import SubCommandsFinder from '@/utils/SubCommandsFinder'
import CommandLanguage from '@/types/commands/CommandLanguage'
import CommandsHandlerLevel2 from '@/services/handlers/commands/CommandsHandlerLevel2'

export default class CommandsHandlerLevel3 extends BaseService {
  private readonly msg: DeleterCommandMessage
  private readonly guild: Guild
  public command: BaseCommand
  public info: Info

  constructor(msg: DeleterCommandMessage, guild: Guild, command: BaseCommand, info: Info) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.info = info
  }

  public handle(mode = 'process'): any {

    const subCommandsFinder = new SubCommandsFinder(this.client.cache.subCommands)

    const commandFlags =
      this.command[this.guild.lang.commands as CommandLanguage].flags && this.command.flags
        ? Object.assign(
        Object.create(this.command[this.guild.lang.commands as CommandLanguage].flags as Record<any, any>),
        Object.create(this.command.flags)
        )
        : this.command[this.guild.lang.commands as CommandLanguage].flags || this.command.flags

    if (commandFlags) {
      this.info.flags = {}

      let args: commandLineArgs.OptionDefinition[] = []
      const commandsFlagsEntries: Array<[string, Record<string, any> | string]> = Object.entries(commandFlags)

      commandsFlagsEntries.forEach(flag => {
        const flagKey = flag[0], flagValue: Record<string, any> | string = flag[1]

        switch (typeof flagValue) {
          case 'string':
            args.push({
              name: flagKey,
              type: Boolean
            })
            break
          case 'object':
            args.push({
              name: flagKey,
              type: flagValue.type ?? Boolean,
              alias: flagValue.alias,
              defaultValue: flagValue.default ?? false
            })
            break
        }
      })

      const parsedFlags = commandLineArgs(args, {
        argv: this.info.args,
        partial: true
      })

      let flags: Record<string, any> = {}

      if (parsedFlags._unknown) {
        this.info.args = parsedFlags._unknown
        delete parsedFlags._unknown
      }

      Object.entries(parsedFlags).forEach(flag => {
        const flagKey = flag[0]

        const commandFlag = commandFlags[flagKey]

        switch (typeof commandFlag) {
          case 'object':
            flags[commandFlag.name] = flag[1]
            break
          case 'string':
            flags[commandFlag] = flag[1]
            break
        }
      })

      Object.assign(this.info.flags, flags)
    }

    if (this.command.hasSubCommands && this.info.args[0]) {
      const subCommand =
        subCommandsFinder.find(this.info.args[0].toLowerCase(), this.command.name, this.guild.lang.commands)

      if (!this.command.overrideSubCommands) {
        if (subCommand) this.command = subCommand as unknown as BaseCommand
        mode = 'this'
        this.info.args = this.info.args.slice(1)
      } else this.info.subCommand = subCommand!
    }

    if (mode === 'process') {
      const commandsHandler = new CommandsHandlerLevel4(this.msg, this.guild, this.command, this.info)
      return commandsHandler.handle()
    } else if (mode === 'this') {
      const commandsHandler = new CommandsHandlerLevel2(this.msg, this.guild, this.command, this.info)
      return commandsHandler.handle()
    }

    return this

  }
}