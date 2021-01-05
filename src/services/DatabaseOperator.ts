import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'
import CachingService from '@/services/CachingService'
import DatabaseGetOptions from '@/types/database/DatabaseGetOptions'
import DatabaseUpdateOptions from '@/types/database/DatabaseUpdateOptions'
import DatabaseDeleteOptions from '@/types/database/DatabaseDeleteOptions'
import { inspect } from 'util'

const { DB_KEYSPACE } = process.env

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client
  private cache: CachingService

  constructor() {
    super()

    const { DB_USRN, DB_PSWD } = process.env

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

    const data = await this.execute(
      `SELECT ${options.selector || '*'} FROM ${DB_KEYSPACE}.${table} WHERE id = ${inspect(id)}`,
      options.params
    )

    if (options.raw) return data
    if (options.array) return data.rows

    if (!options.escapeCache && !options.selector)
      this.cache.set(id, data.rows[0] ?? '')
        .catch(e => console.error(e))

    return data.rows[0]
  }

  public async update(table: string, id: string, data: Record<string, any>, options: DatabaseUpdateOptions = {}) {

    let query: string = `UPDATE ${DB_KEYSPACE}.${table} SET `

    const entries: Array<[string, any]> = Object.entries(data)

    entries.forEach((e, i) => {
      const key = e[0], value = e[1], comma = i === 0 ? '' : ', '
      query += comma + `${key} = ${inspect(value)}`
    })
    query += ` WHERE id = ${inspect(id)}`

    if (!options.upsert) query += ' IF EXISTS'
    if (!options.upsert && options.condition) query += ` ${options.condition}`

    const result = await this.execute(query, options.params)

    if (!options.escapeCache) {
      const isCached: boolean = await this.cache.exist(id)
        .catch((e) => { console.error(e); return false })

      if (isCached) await this.cache.del(id)
        .catch(this.errFn)
    }

    return result
  }

  public async delete(
    table: string,
    id: string,
    selector: string | Array<string>,
    options: DatabaseDeleteOptions = {}
  ) {

    if (Array.isArray(selector)) selector = selector.join(', ')

    let query: string = `DELETE ${selector} FROM ${DB_KEYSPACE}.${table} `

    if (options.timestamp) query += `USING TIMESTAMP ${options.timestamp} `
    query += `WHERE id = ${inspect(id)}`
    if (options.exists) query += ' IF EXISTS'
    else if (options.condition) query += ` ${options.condition}`

    const data = await this.execute(query, options.params)

    if (!options.escapeCache)
      await this.cache.del(id)
        .catch(this.errFn)

    return data
  }

  public execute(query: string, params?: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator