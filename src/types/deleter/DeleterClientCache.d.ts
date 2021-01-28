import Discord from 'discord.js'
import BaseEvent from '@src/abstractions/BaseEvent'
import DeleterPropertiesCache from '@src/types/deleter/DeleterPropertiesCache'

export default interface DeleterClientCache {
  cd: Discord.Collection<string, any>
  commands: Discord.Collection<string, any>,
  subCommands: Discord.Collection<string, any>
  events: Array<BaseEvent>,
  props: DeleterPropertiesCache
}