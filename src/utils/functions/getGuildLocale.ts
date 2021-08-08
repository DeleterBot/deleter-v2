import DeleterGuild from '@src/structures/djs/DeleterGuild'
import { Guild } from 'discord.js'

export function getGuildLocale(guild: DeleterGuild | Guild) {
  return guild.preferredLocale === 'ru-RU' ? 'ru' : 'en'
}
