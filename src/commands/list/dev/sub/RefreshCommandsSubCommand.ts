import BaseSubCommand from '@/abstractions/BaseSubCommand'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import GathererService from '@/services/GathererService'

export default class RefreshCommandsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshCommandsSubCommand', {
      name: 'commands', slaveOf: 'refresh',
      en: {
        name: 'commands',
        aliases: [ 'cmds' ]
      },
      ru: {
        name: 'commands',
        aliases: [ 'cmds' ]
      },
      gg: {
        name: 'commands',
        aliases: [ 'cmds' ]
      }
    })
  }

  execute(): CommandExecutionResult | Promise<CommandExecutionResult> {
    this.client.cache.commands = GathererService.loadCommands()

    return new CommandExecutionResult('😎').setReact()
  }
}