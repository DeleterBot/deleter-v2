import BaseSubCommand from '@/abstractions/BaseSubCommand'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import Gatherer from '@/services/GathererService'

export default class RefreshCommandsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshPropsSubCommand', {
      name: 'props', slaveOf: 'refresh',
      en: {
        name: 'props',
        aliases: [ 'properties', 'p' ]
      },
      ru: {
        name: 'props',
        aliases: [ 'properties', 'p' ]
      },
      gg: {
        name: 'props',
        aliases: [ 'properties', 'p' ]
      }
    })
  }

  execute(): CommandExecutionResult {
    this.client.cache.props = {
      keywords: Gatherer.loadProps('keywords'),
      phrases: Gatherer.loadProps('phrases')
    }

    return new CommandExecutionResult('😎').setReact()
  }
}