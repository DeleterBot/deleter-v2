import Base from '@src/abstractions/Base'
import GuildLanguage from '@src/types/guild/GuildLanguage'
import DeleterGuild from '@src/structures/djs/DeleterGuild'

export default class Guild extends Base {
  public readonly prefix: string
  public readonly lang: GuildLanguage
  public readonly color: string

  constructor(guild: DeleterGuild, data: Record<string, any> = {}) {
    super()

    this.prefix = data.prefix ?? this.client.options.prefix
    this.lang = data.lang ?? guild.locale

    if (data.lang && typeof data.lang === 'string') {
      this.lang = {
        interface: data.lang,
        commands: data.lang
      }
    }

    this.color = data.color ?? this.client.options.color
  }
}
