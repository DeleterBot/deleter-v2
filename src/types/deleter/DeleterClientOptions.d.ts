import Discord from 'discord.js'

export default interface DeleterClientOptions extends Discord.ClientOptions {
  owner: string | Array<string>,
  prefix: string,
  color: string
}