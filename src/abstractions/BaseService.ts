import Base from './Base'

export default class BaseService extends Base {
  public readonly isService: boolean = true

  constructor() {
    super()
  }
}