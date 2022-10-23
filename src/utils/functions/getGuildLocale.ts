import DeleterGuild from '@src/structures/ddoo/DeleterGuild'
import { DiscordLocale, Guild } from 'discordoo'

export function getGuildLocale(guild: DeleterGuild | Guild) {
  return guild.preferredLocale === DiscordLocale.Russian ? 'ru' : 'en'
}
