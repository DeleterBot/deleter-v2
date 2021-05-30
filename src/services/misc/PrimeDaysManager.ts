import BaseService from '@src/abstractions/BaseService'
import Constants from '@src/utils/other/Constants'

const primesTable = Constants.primesTable

export default class PrimeDaysManager extends BaseService {
  constructor() {
    super()
  }

  async decrease(id: string): Promise<boolean> {

    const prime = await this.deleter.db.get(primesTable, id)

    if (!prime) return false

    if (prime.nextDecreaseTimestamp < Date.now()) {
      if (prime.days < 1) return false
      else {
        await this.deleter.db.update(primesTable, id, {
          days: prime.days - 1,
          nextDecreaseTimestamp: Date.now() + 24 * 60 * 60 * 1000
        })

        return true
      }
    } else return true

  }

  async set(id: string, days: number) {
    return this.deleter.db.update(primesTable, id, { days: days }, { upsert: true })
  }

  async increase(id: string, days: number) {
    const prime = await this.deleter.db.get(primesTable, id).catch(() => { return {} })

    return this.set(id, days + (prime?.days ?? 0))
  }

}
