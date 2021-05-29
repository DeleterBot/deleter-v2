import BaseService from '@src/abstractions/BaseService'
import Discord from 'discord.js'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandsReplier from '@src/services/handlers/commands/CommandsReplier'
import CommandExecutionResult  from '@src/types/commands/CommandExecutionResultType'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'

export default class CommandsHandlerLevel5 extends BaseService {
  private readonly msg: DeleterCommandMessage
  private readonly guild: Guild
  private command: BaseCommand
  private readonly context: CommandExecutionContext

  constructor(msg: DeleterCommandMessage, guild: Guild, command: BaseCommand, context: CommandExecutionContext) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.context = context
  }

  public async handle() {

    let commandResult: CommandExecutionResult | Error
    try {
      commandResult = await this.command.execute(this.msg, this.context)
    } catch (e) {
      commandResult = e
    }

    if (commandResult instanceof Error) {
      this.logger.error(undefined, `${this.command.constructor.name}:`, commandResult)
      return CommandsReplier.processReply(
        this.msg,
        `Выполнение команды завершилось с ${commandResult.name}: ${commandResult.message}`
      )
    } else if (commandResult.result) {

      /*if (this.command.cd && !commandResult.success) {
        const coolDownHandler = new CoolDownHandler(this.command.cd, 'idk', 'idk')
      }*/

      if (commandResult.reply)
        return CommandsReplier.processReply(this.msg, commandResult.result, commandResult.options)

      if (commandResult.react) {
        if (Array.isArray(commandResult.result)) {
          return commandResult.result.forEach(emoji => {
            this.msg.react(emoji)
          })
        } else return this.msg.react(commandResult.result as Discord.EmojiResolvable)
      }

      return CommandsReplier.process(this.msg, commandResult.result, commandResult.options)
    }

  }
}
