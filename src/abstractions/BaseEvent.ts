import AbstractEvent from '@src/abstractions/AbstractEvent'
import EventConfig from '@src/types/EventConfig'

export default abstract class BaseEvent extends AbstractEvent {
  public readonly path: string
  public static readonly isEvent: boolean = true

  protected constructor(path: string, config: EventConfig) {
    super(config)
    this.path = path
  }

  abstract execute(argument1: any, argument2?: any): any
}