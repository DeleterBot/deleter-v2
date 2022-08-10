import Discord from 'discordoo'
import DatabaseOperator from '@src/services/store/DatabaseOperator'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk'
import Logger from '@src/utils/other/Logger'

export default class Abstract {
  manager: Discord.ShardingManager
  db: DatabaseOperator
  clientOptions: DeleterClientOptions | undefined
  qiwi: QiwiBillPaymentsAPI
  logger: Logger

  public constructor() {
    this.manager = global.ApiWorker?.manager
    this.logger = global.ApiWorker?.logger
    this.db = global.ApiWorker?.db
    this.qiwi = global.ApiWorker?.qiwi

    try {
      this.clientOptions = require('@src/options').default
    } catch (e) {
      this.clientOptions = undefined
    }
  }
}
