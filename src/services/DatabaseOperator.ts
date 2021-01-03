import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'
import DeleterProcessEnv from '@/types/deleter/DeleterProcessEnv'
import CachingService from '@/services/CachingService'
import DatabaseGetOptions from '@/types/DatabaseGetOptions'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client
  private cache: CachingService

  constructor() {
    super()

    const { DB_USRN, DB_PSWD } = process.env as DeleterProcessEnv

    this.connection = new Cassandra.Client({
      cloud: {
        secureConnectBundle: './secure-connect-deleterdb.zip'
      },
      credentials: {
        username: DB_USRN,
        password: DB_PSWD
      }
    })

    this.cache = new CachingService()
  }

  public connect() {
    return this.connection.connect()
  }

  public async get(table: string, id: string, options: DatabaseGetOptions = {}) {

    if (!options.escapeCache) {
      const cache = await this.cache.get(id)
      if (cache) return cache
    }

    const { DB_KEYSPACE } = process.env as DeleterProcessEnv

    return this.execute(
      `SELECT ${options.selector || '*'} FROM ${DB_KEYSPACE}.${table} WHERE id = '${id}'`
    )
  }

  public execute(query: string, params?: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator