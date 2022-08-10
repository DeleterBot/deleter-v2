import Base from './Base'
import EventConfig from '../types/EventConfig'
import { ClientEventsHandlers } from 'discordoo'

export default abstract class AbstractEvent extends Base implements EventConfig {
  public name: keyof ClientEventsHandlers

  protected constructor(config: EventConfig) {
    super()
    this.name = config?.name
  }
}