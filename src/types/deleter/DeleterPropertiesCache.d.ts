import Discord from 'discord.js'

export default interface DeleterPropertiesCache {
  keywords: Discord.Collection<string, string>,
  phrases: Discord.Collection<string, string>
}