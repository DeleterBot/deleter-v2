import BaseSubCommand from '@/abstractions/BaseSubCommand'
import CommandExecutionResult from '@/structures/CommandExecutionResult'
import Gatherer from '@/services/GathererService'

export default class RefreshUtilsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshUtilsSubCommand', {
      name: 'utils', slaveOf: 'refresh',
      en: {
        name: 'utils',
        aliases: [ 'u' ]
      },
      ru: {
        name: 'utils',
        aliases: [ 'u' ]
      },
      gg: {
        name: 'utils',
        aliases: [ 'u' ]
      }
    })
  }

  execute(): CommandExecutionResult {

    Gatherer.loadFiles((file: string, dir: string) => {
      try {
        const path = `${dir}${file}`,
          req = require

        const fileContents = req(path)?.default

        if (fileContents?.isUtils) delete req.cache[req.resolve(path)]
      } catch (e) {} // eslint-disable-line no-empty
    })

    return new CommandExecutionResult('😎').setReact()
  }
}