import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'
import DeleterPropertiesCache from '@/types/deleter/DeleterPropertiesCache'

export default interface DeleterClientCache {
  cd: Discord.Collection<string, any>
  commands: Discord.Collection<string, any>,
  subCommands: Discord.Collection<string, any>
  events: Array<BaseEvent>,
  props: DeleterPropertiesCache
}