import Guild from '@src/structures/Guild'
import BaseSubCommand from '@src/abstractions/BaseSubCommand'

export default interface Info {
  args: Array<string>
  guild: Guild
  flags: Record<string, boolean>
  subCommand?: BaseSubCommand
  maxExecutionTimestamp: number
}