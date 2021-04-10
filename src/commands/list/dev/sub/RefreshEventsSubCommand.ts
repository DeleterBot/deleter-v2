import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/misc/GathererService'
import RefreshEventsSubCommandConfig from '@src/commands/list/dev/resources/configs/RefreshEventsSubCommandConfig'

export default class RefreshEventsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshEventsSubCommand', new RefreshEventsSubCommandConfig())
  }

  execute(): CommandExecutionResult {

    this.client.cache.events.forEach(e => {
      this.client.off(e.name, e.execute)
    })

    this.client.cache.events = Gatherer.loadEvents()

    this.client.cache.events.forEach(e => {
      this.client.on(e.name, e.execute)
    })

    return new CommandExecutionResult('😎').setReact()
  }
}
