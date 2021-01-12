import AbstractCommand from '@/abstractions/AbstractCommand'
import SubCommandConfig from '@/types/commands/SubCommandConfig'

export default abstract class AbstractSubCommand extends AbstractCommand implements SubCommandConfig {
  public slaveOf: string

  protected constructor(config: SubCommandConfig) {
    super(config)
    this.slaveOf = config?.slaveOf
  }

}