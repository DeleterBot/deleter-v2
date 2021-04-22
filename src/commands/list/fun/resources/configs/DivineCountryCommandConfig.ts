import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class DivineCountryCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'divinecountry'

  public translations: CommandTranslations = {
    ru: {
      name: 'угадайстрану',
      category: 'развлечения'
    },
    en: {
      name: 'divinecountry',
      category: 'fun'
    },
    gg: {
      name: 'чёзафлаг',
      category: 'развлекухи'
    }
  }

  public clientPermissions = [ 'EMBED_LINKS' ]
}
