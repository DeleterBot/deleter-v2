import Discord from 'discordoo'

export default interface GuildIgnore {
  roles: Array<Discord.Snowflake>
  channels: Array<Discord.Snowflake>
}