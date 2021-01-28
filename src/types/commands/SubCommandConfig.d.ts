import CommandConfig from '@src/types/commands/CommandConfig'

export default interface SubCommandConfig extends CommandConfig {
  slaveOf: string
}