import Base from './Base'
import CommandConfig from '../types/CommandConfig'

export default abstract class AbstractCommand extends Base implements CommandConfig {
  public name: string

  protected constructor(config: CommandConfig) {
    super()
    this.name = config?.name
  }
}