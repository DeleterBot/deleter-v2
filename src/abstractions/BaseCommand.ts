import AbstractCommand from './AbstractCommand'
import Discord from 'discord.js'
import Info from '@/types/Info'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import BaseCommandConfig from '@/types/commands/BaseCommandConfig'

export default abstract class BaseCommand extends AbstractCommand {
  public readonly path: string
  public readonly hasSubCommands: boolean | undefined
  public readonly overrideSubCommands: boolean | undefined
  public static readonly isCommand: boolean = true

  protected constructor(path: string, config: BaseCommandConfig) {
    super(config)

    this.path = path
    this.hasSubCommands = config?.hasSubCommands
    this.overrideSubCommands = config?.overrideSubCommands
  }

  abstract execute(msg: Discord.Message, info: Info): CommandExecutionResult | Promise<CommandExecutionResult>
}