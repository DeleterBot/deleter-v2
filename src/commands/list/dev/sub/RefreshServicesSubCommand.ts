import BaseSubCommand from '@/abstractions/BaseSubCommand'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import Gatherer from '@/services/GathererService'

export default class RefreshServicesSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshServicesSubCommand', {
      name: 'services', slaveOf: 'refresh',
      en: {
        name: 'services',
        aliases: [ 's' ]
      },
      ru: {
        name: 'services',
        aliases: [ 's' ]
      },
      gg: {
        name: 'services',
        aliases: [ 's' ]
      }
    })
  }

  execute(): CommandExecutionResult {

    Gatherer.loadFiles((file: string, dir: string) => {
      try {
        const path = `${dir}${file}`,
          req = require

        const fileContents = req(path)?.default

        if (fileContents?.isService) delete req.cache[req.resolve(path)]
      } catch (e) {} // eslint-disable-line no-empty
    })

    return new CommandExecutionResult('😎').setReact()
  }
}