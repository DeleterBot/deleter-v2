import Discord from 'discord.js'
import BaseEvent from '@/abstractions/BaseEvent'

export default interface DeleterClientCache {
  commands: Discord.Collection<string, any>,
  subCommands: Discord.Collection<string, any>
  events: Array<BaseEvent>
}