import BaseService from '@src/abstractions/BaseService'
import Discord from 'discord.js'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandsReplier from '@src/services/handlers/commands/CommandsReplier'
import CommandExecutionResult  from '@src/types/commands/CommandExecutionResultType'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'

// command reply operator: catching command errors, sending command execution result to Discord
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

    let executionResult: CommandExecutionResult | Error
    try {
      executionResult = await this.command.execute(this.msg, this.context)
    } catch (e: any) {
      executionResult = e
    }

    if (executionResult instanceof Error) {
      this.logger.error(undefined, `${this.command.constructor.name}:`, executionResult)
      return CommandsReplier.processReply(
        this.msg,
        `Выполнение команды завершилось с ${executionResult.name}: ${executionResult.message}`
      )
    } else if (executionResult.result) {

      if (executionResult.reply)
        return CommandsReplier.processReply(this.msg, executionResult.result, executionResult.options)

      if (executionResult.react) {
        if (Array.isArray(executionResult.result)) {
          return executionResult.result.forEach(emoji => {
            this.msg.react(emoji)
          })
        } else return this.msg.react(executionResult.result as Discord.EmojiResolvable)
      }

      return CommandsReplier.process(this.msg, executionResult.result, executionResult.options)
    }

  }
}
