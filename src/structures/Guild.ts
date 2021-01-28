import Base from '@src/abstractions/Base'
import Discord from 'discord.js'
import GuildLanguage from '@src/types/guild/GuildLanguage'

export default class Guild extends Base {
  public readonly prefix: string
  public readonly lang: GuildLanguage
  public readonly color: string

  constructor(guild: Discord.Guild, data: Record<string, any> = {}) {
    super()

    this.prefix = data.prefix ?? this.client.options.prefix
    this.lang = data.lang ??
      (guild.region === 'russia'
        ? { interface: 'ru', commands: 'ru' }
        : { interface: 'en', commands: 'en' }
      )

    if (data.lang && typeof data.lang === 'string') {
      this.lang = {
        interface: data.lang,
        commands: data.lang
      }
    }

    this.color = data.color ?? this.client.options.color
  }
}