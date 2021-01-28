import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import GathererService from '@src/services/GathererService'

export default class RefreshCommandsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshCommandsSubCommand', {
      name: 'commands', slaveOf: 'refresh',
      en: {
        name: 'commands',
        aliases: [ 'cmds', 'c' ]
      },
      ru: {
        name: 'commands',
        aliases: [ 'cmds', 'c' ]
      },
      gg: {
        name: 'commands',
        aliases: [ 'cmds', 'c' ]
      }
    })
  }

  execute(): CommandExecutionResult {
    this.client.cache.commands = GathererService.loadCommands()
    this.client.cache.subCommands = GathererService.loadSubCommands()

    return new CommandExecutionResult('😎').setReact()
  }
}