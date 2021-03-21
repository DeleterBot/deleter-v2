import CommandTranslations from '@src/types/commands/CommandTranslations'
import SubCommandConfig from '@src/types/commands/SubCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class RefreshEventsSubCommandConfig extends AbstractConfig implements SubCommandConfig {
  public name = 'events'
  public slaveOf = 'refresh'

  public translations: CommandTranslations = {
    en: {
      name: 'events',
      aliases: [ 'events', 'e' ]
    },
    ru: {
      name: 'events',
      aliases: [ 'events', 'e' ]
    },
    gg: {
      name: 'events',
      aliases: [ 'events', 'e' ]
    }
  }

}
