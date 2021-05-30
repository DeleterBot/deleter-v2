import BaseService from '@src/abstractions/BaseService'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandsHandlerLevel5 from '@src/services/handlers/commands/CommandsHandlerLevel5'
import CommandDtoProcessor from '@src/utils/processors/CommandDtoProcessor'

// dto processing and handling
export default class CommandsHandlerLevel4 extends BaseService {
  private readonly msg: DeleterCommandMessage
  private readonly guild: Guild
  private readonly command: BaseCommand
  private readonly context: CommandExecutionContext

  constructor(msg: DeleterCommandMessage, guild: Guild, command: BaseCommand, context: CommandExecutionContext) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.context = context
  }

  public async handle() {

    if (this.command.dto) {
      const validationErrors = await CommandDtoProcessor.validate(this.msg, this.context, this.command.dto)
      this.logger.log(undefined, validationErrors)
      if (validationErrors.length) return this.msg.reply(validationErrors[0].constraints!.isNumberString)
    }

    const handler = new CommandsHandlerLevel5(this.msg, this.guild, this.command, this.context)
    return handler.handle()

  }
}
