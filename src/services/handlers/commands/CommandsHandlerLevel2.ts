import BaseService from '@src/abstractions/BaseService'
import Guild from '@src/structures/Guild'
import BaseCommand from '@src/abstractions/BaseCommand'
import { Message } from 'discordoo'
import CommandsHandlerLevel3 from '@src/services/handlers/commands/CommandsHandlerLevel3'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import isCommandExecutable from '@src/utils/functions/commands/isCommandExecutable'
import CommandsReplier from '@src/services/handlers/commands/CommandsReplier'
import StringPropertiesParser from '@src/utils/parsers/StringPropertiesParser'

// permissions checking: resolving custom permissions, looking if command disabled or enabled
export default class CommandsHandlerLevel2 extends BaseService {
  private readonly msg: Message
  private readonly guild: Guild
  private readonly command: BaseCommand
  private readonly context: CommandExecutionContext
  private readonly parser: StringPropertiesParser = new StringPropertiesParser()

  constructor(msg: Message, guild: Guild, command: BaseCommand, context: CommandExecutionContext) {
    super()

    this.msg = msg
    this.guild = guild
    this.command = command
    this.context = context
  }

  public async handle() {

    if (this.command.disabled) return

    const is = await isCommandExecutable(this.deleter, this.command, this.guild, this.msg)
    if (!is.executable) return CommandsReplier.processReply(this.msg, this.parser.parse(is.why))

    const commandsHandler = new CommandsHandlerLevel3(this.msg, this.guild, this.command, this.context)
    return commandsHandler.handle()

  }
}
