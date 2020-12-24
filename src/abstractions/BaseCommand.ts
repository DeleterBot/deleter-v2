import AbstractCommand from './AbstractCommand'
import CommandConfig from '../types/CommandConfig'
import Discord from 'discord.js'

export default abstract class BaseCommand extends AbstractCommand {
  public readonly path: string
  public static readonly isCommand: boolean = true

  protected constructor(path: string, config: CommandConfig) {
    super(config)
    this.path = path
  }

  abstract execute(msg: Discord.Message): any
}