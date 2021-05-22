import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class IWantDisableSubCommandConfig extends AbstractConfig implements SubCommandConfig {
  public name = 'disable'
  public slaveOf = 'iwant'

  public translations: CommandTranslations = {
    en: {
      name: 'disable'
    },
    ru: {
      name: 'выключить',
      aliases: [ 'отключить' ]
    },
    gg: {
      name: 'вырубить',
      aliases: [ 'отключить' ]
    }
  }

}
