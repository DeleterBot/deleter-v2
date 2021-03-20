import Discord from 'discord.js'
import DeleterGuild from '@src/structures/djs/DeleterGuild'

export default interface DeleterCommandMessage extends Discord.Message {
  channel: Discord.NewsChannel | Discord.TextChannel
  guild: DeleterGuild
}
