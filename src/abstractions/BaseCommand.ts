import AbstractCommand from './AbstractCommand'
import Discord from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import { Message } from 'discordoo'

export default abstract class BaseCommand extends AbstractCommand {
  public readonly path: string
  public readonly hasSubCommands: boolean | undefined
  public readonly overrideSubCommands: boolean | undefined
  declare public readonly multiLang: boolean | undefined
  public static readonly isCommand: boolean = true

  protected constructor(path: string, config: BaseCommandConfig) {
    super(config)

    this.path = path
    this.hasSubCommands = config?.hasSubCommands
    this.overrideSubCommands = config?.overrideSubCommands
  }

  abstract execute(msg: Discord.Message | Message, context: CommandExecutionContext):
    CommandExecutionResult | Promise<CommandExecutionResult>
}
