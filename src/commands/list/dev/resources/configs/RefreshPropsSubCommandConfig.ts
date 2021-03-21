import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'

export default class RefreshPropsSubCommandConfig implements SubCommandConfig {
  public name = 'props'
  public slaveOf = 'refresh'

  public translations: CommandTranslations = {
    en: {
      name: 'props',
      aliases: [ 'properties', 'p' ]
    },
    ru: {
      name: 'props',
      aliases: [ 'properties', 'p' ]
    },
    gg: {
      name: 'props',
      aliases: [ 'properties', 'p' ]
    }
  }

}
