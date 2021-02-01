import Discord from 'discord.js'
import DatabaseOperator from '@src/services/DatabaseOperator'

export default class Abstract {
  manager: Discord.ShardingManager
  db: DatabaseOperator

  public constructor() {
    this.manager = global.ApiWorker?.manager
    this.db = global.ApiWorker?.db
  }
}