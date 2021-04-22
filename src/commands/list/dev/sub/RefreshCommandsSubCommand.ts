import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import GathererService from '@src/services/misc/GathererService'
import RefreshCommandsSubCommandConfig from '@src/commands/list/dev/resources/configs/RefreshCommandsSubCommandConfig'

export default class RefreshCommandsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshCommandsSubCommand', new RefreshCommandsSubCommandConfig())
  }

  execute(): CommandExecutionResult {
    this.deleter.cache.commands = GathererService.loadCommands()
    this.deleter.cache.subCommands = GathererService.loadSubCommands()

    return new CommandExecutionResult('😎').setReact()
  }
}
