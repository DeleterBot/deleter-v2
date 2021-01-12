import Discord from 'discord.js'
import Info from '@/types/Info'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import AbstractSubCommand from '@/abstractions/AbstractSubCommand'
import SubCommandConfig from '@/types/commands/SubCommandConfig'

export default abstract class BaseSubCommand extends AbstractSubCommand {
  public readonly path: string
  public static readonly isSubCommand: boolean = true

  protected constructor(path: string, config: SubCommandConfig) {
    super(config)
    this.path = path
  }

  abstract execute(msg: Discord.Message, info: Info): CommandExecutionResult | Promise<CommandExecutionResult>
}