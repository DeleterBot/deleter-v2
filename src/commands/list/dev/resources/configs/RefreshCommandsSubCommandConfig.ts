import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'

export default class RefreshCommandsSubCommandConfig implements SubCommandConfig {
  public name = 'commands'
  public slaveOf = 'refresh'

  public translations: CommandTranslations = {
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
  }

}
