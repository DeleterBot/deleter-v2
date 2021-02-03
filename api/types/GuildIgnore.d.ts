import Discord from 'discord.js'

export default interface GuildIgnore {
  roles: Array<Discord.Snowflake>
  channels: Array<Discord.Snowflake>
}