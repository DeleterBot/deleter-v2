import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'

export default class StatsCommandConfig implements BaseCommandConfig {
  public name = 'stats'

  public translations: CommandTranslations = {
    ru: {
      name: 'стата',
      category: 'информация'
    },
    en: {
      name: 'stats',
      category: 'information'
    },
    gg: {
      name: 'хуята',
      category: 'информейшн'
    }
  }

  public clientPermissions = [ 'EMBED_LINKS' ]
}
