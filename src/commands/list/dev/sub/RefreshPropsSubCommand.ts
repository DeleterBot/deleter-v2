import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/misc/GathererService'
import RefreshPropsSubCommandConfig from '@src/commands/list/dev/resources/configs/RefreshPropsSubCommandConfig'

export default class RefreshCommandsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshPropsSubCommand', new RefreshPropsSubCommandConfig())
  }

  execute(): CommandExecutionResult {
    this.client.cache.props = {
      keywords: Gatherer.loadProps('keywords'),
      phrases: Gatherer.loadProps('phrases')
    }

    return new CommandExecutionResult('😎').setReact()
  }
}
