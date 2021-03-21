import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'

export default class HelpCommandConfig implements BaseCommandConfig {
  public name = 'help'
  public multiLang = true

  public translations: CommandTranslations = {
    en: {
      name: 'help',
      category: 'information'
    },
    ru: {
      name: 'хелп',
      category: 'информация',
      aliases: [ 'помощь' ]
    },
    gg: {
      name: 'хуелп',
      category: 'информейшн',
      aliases: [ 'хуёмощь', 'хелп', 'помощь' ]
    }
  }

  public clientPermissions = [ 'EMBED_LINKS' ]
}
