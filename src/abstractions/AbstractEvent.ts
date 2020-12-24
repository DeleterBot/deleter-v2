import Base from './Base'
import EventConfig from '../types/EventConfig'

export default abstract class AbstractEvent extends Base implements EventConfig {
  public name: string

  protected constructor(config: EventConfig) {
    super()
    this.name = config?.name
  }
}