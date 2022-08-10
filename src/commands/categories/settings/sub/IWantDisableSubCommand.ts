import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import IWantDisableSubCommandConfig
  from '@src/commands/categories/settings/resources/configs/IWantDisableSubCommandConfig'
import { Message } from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/parsers/StringPropertiesParser'
import Constants from '@src/utils/other/Constants'

export default class IWantDisableSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.categories.settings.sub.IWantDisableSubCommand', new IWantDisableSubCommandConfig())
  }

  async execute(msg: Message, context: CommandExecutionContext): Promise<CommandExecutionResult> {

    const result = new CommandExecutionResult(null),
      parser = new StringPropertiesParser(),
      root = `${context.guild.lang.interface}.deleter.commands.categories.settings.command.sub.disable`

    switch (context.args.join(' ')) {
      case parser.parse(`$key[${root}.presences]`):
        await this.deleter.db.delete(Constants.usersTable, msg.authorId, 'presences_enabled')
        result.setResult(Constants.successEmoji).setReact()
        break
      default:
        result.setResult(parser.parse(`$phrase[${root}.help]`))
        break
    }

    return result

  }
}
