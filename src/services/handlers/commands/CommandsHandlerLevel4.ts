import BaseService from '@src/abstractions/BaseService'
import { Message } from 'discordoo'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandsHandlerLevel5 from '@src/services/handlers/commands/CommandsHandlerLevel5'
import CommandDtoProcessor from '@src/utils/processors/CommandDtoProcessor'
import CommandsReplier from '@src/services/handlers/commands/CommandsReplier'

// dto processing and handling
export default class CommandsHandlerLevel4 extends BaseService {
  private readonly msg: Message
  private readonly guild: Guild
  private readonly command: BaseCommand
  private readonly context: CommandExecutionContext

  constructor(msg: Message, guild: Guild, command: BaseCommand, context: CommandExecutionContext) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.context = context
  }

  public async handle() {

    /*if (this.command.dto) {
      const { errors, dto } = await CommandDtoProcessor.validate(this.msg, this.context, this.command.dto)

      if (errors.length) {
        return CommandsReplier.processReply(this.msg, 'validation error')
      }

      this.context.dto = dto
    }*/

    const handler = new CommandsHandlerLevel5(this.msg, this.guild, this.command, this.context)
    return handler.handle()

  }
}
