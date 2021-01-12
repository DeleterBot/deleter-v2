import BaseService from '@/abstractions/BaseService'
import Guild from '@/structures/Guild'
import BaseCommand from '@/abstractions/BaseCommand'
import DeleterCommandMessage from '@/types/deleter/DeleterCommandMessage'
import CommandsHandlerLevel4 from '@/services/handlers/commands/CommandsHandlerLevel4'
import Info from '@/types/Info'
import SubCommandsFinder from '@/utils/SubCommandsFinder'
import CommandLanguage from '@/types/commands/CommandLanguage'
import parseFlags from 'minimist'
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

  public handle(mode: string = 'process'): any {

    const subCommandsFinder = new SubCommandsFinder(this.client.cache.subCommands)

    const commandFlags =
      this.command[this.guild.lang.commands as CommandLanguage].flags && this.command.flags
        ? Object.assign(
        Object.create(this.command[this.guild.lang.commands as CommandLanguage].flags as object),
        Object.create(this.command.flags)
        )
        : this.command[this.guild.lang.commands as CommandLanguage].flags || this.command.flags

    if (commandFlags) {
      let newlyArgs: string[] = []
      const commandsFlagsKeys = Object.keys(commandFlags)

      const parsedFlags = parseFlags(this.info.args, {
        boolean: commandsFlagsKeys,
        unknown: (str) => {
          if (commandsFlagsKeys.includes(str)) return true
          else {
            newlyArgs.push(str)
            return false
          }
        }
      })

      // @ts-ignore
      delete parsedFlags._

      const flagsArr = Object.entries(parsedFlags).filter(flag => flag[1])
      const flags: Record<string, boolean> = {}

      flagsArr.forEach(flag => {
        flags[commandFlags[flag[0]]] = true
      })

      this.info.args = newlyArgs
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