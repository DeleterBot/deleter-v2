import BaseService from '@src/abstractions/BaseService'
import CoolDownConfig from '@src/types/commands/CoolDownConfig'
//import Snowflake from '@src/utils/Snowflake'

export default class CoolDownHandler extends BaseService {
  private readonly coolDownConfig: CoolDownConfig
  private readonly coolDownFor: string
  private readonly coolDownFrom: string

  constructor(coolDown: CoolDownConfig, coolDownFor: string, coolDownFrom: string) {
    super()

    this.coolDownConfig = coolDown
    this.coolDownFor = coolDownFor
    this.coolDownFrom = coolDownFrom
  }

  public startCoolDown() {

    const expirationTimestamp = Date.now() + (this.coolDownConfig.time * 100)
    //const id = Snowflake.generate(expirationTimestamp)
    const coolDownItem: Record<string, any> = this.deleter.cache.cd.get(this.coolDownFrom)

    if (coolDownItem) {

    }

  }

  /*public findCoolDownedItem(coolDownFor: string, coolDownFrom: string) {

  }*/

}
