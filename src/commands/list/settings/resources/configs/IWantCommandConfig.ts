import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class IWantCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'iwant'

  public translations: CommandTranslations = {
    ru: {
      name: 'яхочу',
      category: 'настройки'
    },
    en: {
      name: 'iwant',
      category: 'settings'
    },
    gg: {
      name: 'яхочу',
      category: 'настроечки'
    }
  }

  public clientPermissions = [ 'EMBED_LINKS' ]
}
