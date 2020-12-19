import Discord from 'discord.js'
import BaseCommand from '@/base/BaseCommand'
import BaseEvent from '@/base/BaseEvent'

export default interface DeleterClientCache {
  commands: Discord.Collection<string, BaseCommand>,
  events: Array<BaseEvent>
}