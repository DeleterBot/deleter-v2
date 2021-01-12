import CommandConfig from '@/types/commands/CommandConfig'

export default interface BaseCommandConfig extends CommandConfig {
  hasSubCommands?: boolean
  overrideSubCommands?: boolean
}