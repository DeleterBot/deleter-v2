import Discord from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import AbstractSubCommand from '@src/abstractions/AbstractSubCommand'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'
import { Message } from 'discordoo'

export default abstract class BaseSubCommand extends AbstractSubCommand {
  public readonly path: string
  public static readonly isSubCommand: boolean = true

  protected constructor(path: string, config: SubCommandConfig) {
    super(config)
    this.path = path
  }

  abstract execute(msg: Discord.Message | Message, context: CommandExecutionContext):
    CommandExecutionResult | Promise<CommandExecutionResult>
}
