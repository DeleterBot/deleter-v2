import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/misc/GathererService'
import RefreshServicesSubCommandConfig from '@src/commands/list/dev/resources/configs/RefreshServicesSubCommandConfig'

export default class RefreshServicesSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshServicesSubCommand', new RefreshServicesSubCommandConfig())
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
