import Discord from 'discord.js'
import DatabaseOperator from '@src/services/DatabaseOperator'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'

export default class Abstract {
  manager: Discord.ShardingManager
  db: DatabaseOperator
  clientOptions: DeleterClientOptions | undefined

  public constructor() {
    this.manager = global.ApiWorker?.manager
    this.db = global.ApiWorker?.db
    try {
      this.clientOptions = require('@src/options').default
    } catch (e) {
      this.clientOptions = undefined
    }
  }
}