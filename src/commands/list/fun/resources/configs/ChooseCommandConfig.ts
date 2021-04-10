import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class ChooseCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'choose'

  public translations: CommandTranslations = {
    ru: {
      name: 'выбери',
      category: 'развлечения'
    },
    en: {
      name: 'choose',
      category: 'fun'
    },
    gg: {
      name: 'чуз',
      category: 'развлекухи',
      aliases: [ 'чуз', 'санчуз' ]
    }
  }

  public clientPermissions = [ 'EMBED_LINKS' ]
}
