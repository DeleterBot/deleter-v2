import Base from '@/abstractions/Base'
import DeleterClientOptions from '@/types/deleter/DeleterClientOptions'
import Discord from 'discord.js'
import GuildLanguage from '@/types/guild/GuildLanguage'

export default class Guild extends Base {
  public readonly prefix: string
  public readonly lang: GuildLanguage

  constructor(guild: Discord.Guild, data: Record<string, any> = {}) {
    super()

    this.prefix = data.prefix ?? (this.client.options as DeleterClientOptions).prefix
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
  }
}