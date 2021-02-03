import Discord from 'discord.js'
import DatabaseOperator from '@src/services/DatabaseOperator'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
import QiwiBillPaymentsAPI  from '@qiwi/bill-payments-node-js-sdk'

export default class Abstract {
  manager: Discord.ShardingManager
  db: DatabaseOperator
  clientOptions: DeleterClientOptions | undefined
  qiwi: QiwiBillPaymentsAPI

  public constructor() {
    this.manager = global.ApiWorker?.manager
    this.db = global.ApiWorker?.db
    this.qiwi = global.ApiWorker?.qiwi
    try {
      this.clientOptions = require('@src/options').default
    } catch (e) {
      this.clientOptions = undefined
    }
  }
}
