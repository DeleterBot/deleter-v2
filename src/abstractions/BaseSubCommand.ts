import Discord from 'discord.js'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import AbstractSubCommand from '@src/abstractions/AbstractSubCommand'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'

export default abstract class BaseSubCommand extends AbstractSubCommand {
  public readonly path: string
  public static readonly isSubCommand: boolean = true

  protected constructor(path: string, config: SubCommandConfig) {
    super(config)
    this.path = path
  }

  abstract execute(msg: Discord.Message, info: Info): CommandExecutionResult | Promise<CommandExecutionResult>
}