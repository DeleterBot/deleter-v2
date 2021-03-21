import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class RefreshConfigsSubCommandConfig extends AbstractConfig implements SubCommandConfig {
  public name = 'configs'
  public slaveOf = 'refresh'

  public translations: CommandTranslations = {
    en: {
      name: 'configs',
      aliases: [ 'cnfgs', 'cn' ]
    },
    ru: {
      name: 'configs',
      aliases: [ 'cnfgs', 'cn' ]
    },
    gg: {
      name: 'configs',
      aliases: [ 'cnfgs', 'cn' ]
    }
  }

}
