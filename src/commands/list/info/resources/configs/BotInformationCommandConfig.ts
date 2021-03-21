import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class BotInformationCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'info'

  public translations: CommandTranslations = {
    ru: {
      name: 'инфо',
      category: 'информация'
    },
    en: {
      name: 'info',
      category: 'information'
    },
    gg: {
      name: 'инфа',
      category: 'информейшн',
      aliases: [ 'инфо' ]
    }
  }

  public clientPermissions = [ 'EMBED_LINKS' ]
}
