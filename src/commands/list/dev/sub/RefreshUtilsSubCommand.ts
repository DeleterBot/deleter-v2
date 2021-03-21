import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/GathererService'
import RefreshUtilsSubCommandConfig from '@src/commands/list/dev/resources/configs/RefreshUtilsSubCommandConfig'

export default class RefreshUtilsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshUtilsSubCommand', new RefreshUtilsSubCommandConfig())
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
