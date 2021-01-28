import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/GathererService'

export default class RefreshEventsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshEventsSubCommand', {
      name: 'events', slaveOf: 'refresh',
      en: {
        name: 'events',
        aliases: [ 'events', 'e' ]
      },
      ru: {
        name: 'events',
        aliases: [ 'events', 'e' ]
      },
      gg: {
        name: 'events',
        aliases: [ 'events', 'e' ]
      }
    })
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