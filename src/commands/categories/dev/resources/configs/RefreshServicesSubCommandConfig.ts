import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class RefreshServicesSubCommandConfig extends AbstractConfig implements SubCommandConfig {
  public name = 'services'
  public slaveOf = 'refresh'

  public translations: CommandTranslations = {
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
  }

}
