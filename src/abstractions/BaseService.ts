import Base from './Base'

export default class BaseService extends Base {
  public static readonly isService: boolean = true

  constructor() {
    super()
  }
}