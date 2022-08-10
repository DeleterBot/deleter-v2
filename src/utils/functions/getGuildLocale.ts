import DeleterGuild from '@src/structures/djs/DeleterGuild'
import { DiscordLocale, Guild } from 'discordoo'

export function getGuildLocale(guild: DeleterGuild | Guild) {
  return guild.preferredLocale === DiscordLocale.Russian ? 'ru' : 'en'
}
