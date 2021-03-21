import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class RefreshUtilsSubCommandConfig extends AbstractConfig implements SubCommandConfig {
  public name = 'utils'
  public slaveOf = 'refresh'

  public translations: CommandTranslations = {
    en: {
      name: 'utils',
      aliases: [ 'util', 'u' ]
    },
    ru: {
      name: 'utils',
      aliases: [ 'util', 'u' ]
    },
    gg: {
      name: 'utils',
      aliases: [ 'util', 'u' ]
    }
  }

}
