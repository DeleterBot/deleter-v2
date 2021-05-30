import DeleterClient from '@src/structures/DeleterClient'
import Logger from '@src/utils/other/Logger'

export default class Base {
  public deleter: DeleterClient
  public blankFn = () => {} // eslint-disable-line no-empty
  public errFn = (err: any) => this.logger.error(err)
  public logger: Logger

  constructor() {
    this.deleter = global.deleter
    this.logger = this.deleter?.logger || new Logger()
  }
}
