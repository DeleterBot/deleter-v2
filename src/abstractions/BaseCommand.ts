import AbstractCommand from './AbstractCommand'
import CommandConfig from '@/types/commands/CommandConfig'
import Discord from 'discord.js'
import Info from '@/types/Info'
import CommandExecutionResult from '@/structures/CommandExecutionResult'

export default abstract class BaseCommand extends AbstractCommand {
  public readonly path: string
  public static readonly isCommand: boolean = true

  protected constructor(path: string, config: CommandConfig) {
    super(config)
    this.path = path
  }

  abstract execute(msg: Discord.Message, info: Info): CommandExecutionResult | Promise<CommandExecutionResult>
}