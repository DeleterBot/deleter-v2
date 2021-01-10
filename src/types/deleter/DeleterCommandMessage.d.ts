import Discord from 'discord.js'

export default interface DeleterCommandMessage extends Discord.Message {
  channel: Discord.NewsChannel | Discord.TextChannel
  guild: Discord.Guild
}