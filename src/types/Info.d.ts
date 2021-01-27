import Guild from '@/structures/Guild'
import BaseSubCommand from '@/abstractions/BaseSubCommand'

export default interface Info {
  args: Array<string>
  guild: Guild
  flags: Record<string, boolean>
  subCommand?: BaseSubCommand
  maxExecutionTimestamp: number
}