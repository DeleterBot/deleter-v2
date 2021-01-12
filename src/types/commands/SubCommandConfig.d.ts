import CommandConfig from '@/types/commands/CommandConfig'

export default interface SubCommandConfig extends CommandConfig {
  slaveOf: string
}