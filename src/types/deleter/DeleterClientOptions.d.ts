import Discord from 'discord.js'

export default interface DeleterClientOptions extends Discord.ClientOptions {
  owner: string
  prefix: string
  color: string
}
