import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/misc/GathererService'
import RefreshEventsSubCommandConfig from '@src/commands/categories/dev/resources/configs/RefreshEventsSubCommandConfig'

export default class RefreshEventsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.categories.dev.sub.RefreshEventsSubCommand', new RefreshEventsSubCommandConfig())
  }

  execute(): CommandExecutionResult {

    this.deleter.cache.events.forEach(e => {
      this.deleter.off(e.name, e.execute)
    })

    this.deleter.cache.events = Gatherer.loadEvents()

    this.deleter.cache.events.forEach(e => {
      this.deleter.on(e.name, e.execute)
    })

    return new CommandExecutionResult('😎').setReact()
  }
}
