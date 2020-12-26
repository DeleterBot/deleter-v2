import Discord from 'discord.js'
import BaseCommand from '@/abstractions/BaseCommand'
import BaseEvent from '@/abstractions/BaseEvent'

export default interface DeleterClientCache {
  commands: Discord.Collection<string, BaseCommand>,
  events: Array<BaseEvent>
}