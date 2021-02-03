import GuildLanguage from '@src/types/guild/GuildLanguage'
import GuildIgnore from '@api/types/GuildIgnore'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'

export default class GuildGeneralSettings {
  public prefix: string
  public color: string
  public lang: GuildLanguage
  public ignore: GuildIgnore

  constructor(options: DeleterClientOptions, data: Record<string, any> = {}) {
    this.color = data.color ?? options.color
    this.prefix = data.prefix ?? options.prefix

    this.lang = data.lang ?? {
      interface: 'ru',
      commands: 'ru'
    }

    this.ignore = data.ignore ?? {
      commands: [],
      roles: []
    }
  }
}