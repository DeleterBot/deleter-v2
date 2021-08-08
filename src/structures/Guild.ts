import Base from '@src/abstractions/Base'
import GuildLanguage from '@src/types/guild/GuildLanguage'
import DeleterGuild from '@src/structures/djs/DeleterGuild'
import { HexColorString } from 'discord.js'
import { getGuildLocale } from '@src/utils/functions/getGuildLocale'

export default class Guild extends Base {
  public readonly prefix: string
  public readonly lang: GuildLanguage
  public readonly color: HexColorString

  constructor(guild: DeleterGuild, data: Record<string, any> = {}) {
    super()

    this.prefix = data.prefix ?? this.deleter.options.prefix
    this.lang = data.lang ?? { commands: getGuildLocale(guild), interface: getGuildLocale(guild) }

    if (data.lang && typeof data.lang === 'string') {
      this.lang = {
        interface: data.lang,
        commands: data.lang
      }
    }

    this.color = data.color ?? this.deleter.options.color
  }
}
