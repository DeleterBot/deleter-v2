import BaseService from '@/abstractions/BaseService'
import CoolDownConfig from '@/types/commands/CoolDownConfig'
import Snowflake from '@/utils/Snowflake'

/**
 * @class CoolDown Handler.
 * @param {CoolDownConfig} coolDown The cool down config.
 * @param {string} coolDownFor Item, that will be cool downed.
 * @param {string} coolDownFrom Item, that will be used to check if the previous item is cool downed.
 */

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
    const id = Snowflake.generate(expirationTimestamp)
    let coolDownItem: Record<string, any> = this.client.cache.cd.get(this.coolDownFrom)

    if (coolDownItem) {

    }

  }

  public findCoolDownedItem(coolDownFor: string, coolDownFrom: string) {

  }

}