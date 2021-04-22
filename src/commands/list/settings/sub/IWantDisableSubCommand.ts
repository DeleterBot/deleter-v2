import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import IWantDisableSubCommandConfig from '@src/commands/list/settings/resources/configs/IWantDisableSubCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import Constants from '@src/utils/Constants'

export default class IWantDisableSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.settings.sub.IWantDisableSubCommand', new IWantDisableSubCommandConfig())
  }

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {

    const result = new CommandExecutionResult(null),
      parser = new StringPropertiesParser(),
      root = `${info.guild.lang.interface}.deleter.commands.list.settings.command.sub.disable`

    switch (info.args.join(' ')) {
      case parser.parse(`$key[${root}.presences]`):
        await this.deleter.db.delete(Constants.usersTable, msg.author.id, 'presences_enabled')
        result.setResult(Constants.successEmoji).setReact()
        break
      default:
        result.setResult(parser.parse(`$phrase[${root}.help]`))
        break
    }

    return result

  }
}
