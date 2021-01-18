import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'
import CachingService from '@/services/CachingService'
import DatabaseGetOptions from '@/types/database/DatabaseGetOptions'
import DatabaseUpdateOptions from '@/types/database/DatabaseUpdateOptions'
import DatabaseDeleteOptions from '@/types/database/DatabaseDeleteOptions'
import { inspect } from 'util'
import DatabaseFindOptions from '@/types/database/DatabaseFindOptions'

const { DB_KEYSPACE } = process.env
let { ENABLE_CACHE } = process.env

// @ts-ignore
ENABLE_CACHE = ENABLE_CACHE === 'true'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client
  private cache: CachingService | undefined

  constructor() {
    super()

    this.connection = new Cassandra.Client({
      cloud: {
        secureConnectBundle: './secure-connect-deleterdb.zip'
      },
      credentials: {
        username: process.env.DB_USRN,
        password: process.env.DB_PSWD
      }
    })

    if (ENABLE_CACHE) this.cache = new CachingService()
  }

  public connect() {
    return this.connection.connect()
  }

  public async get(table: string, id: string, options: DatabaseGetOptions = {}) {

    const cacheKey = `${table}:${id}`

    if (!options.escapeCache && ENABLE_CACHE) {
      const cache = await this.cache!.get(cacheKey)
      if (cache) return cache
    }

    const data = await this.execute(
      `SELECT ${options.selector || '*'} FROM ${DB_KEYSPACE}.${table} WHERE id = ${inspect(id)}`,
      options.params
    )

    if (options.raw) return data
    if (options.array) return data.rows

    if (!options.escapeCache && !options.selector && ENABLE_CACHE)
      this.cache!.set(cacheKey, data.rows[0] ?? '')
        .catch(e => console.error(e))

    return data.rows[0]
  }

  // TODO: database find method
  // public async find(table: string, what: string, id: string, options: DatabaseFindOptions = {}) {}

  public async update(table: string, id: string, data: Record<string, any>, options: DatabaseUpdateOptions = {}) {

    let query = `UPDATE ${DB_KEYSPACE}.${table} SET `

    const entries: Array<[string, any]> = Object.entries(data)

    entries.forEach((e, i) => {
      const key = e[0], value = e[1], comma = i === 0 ? '' : ', '

      if (key.split(/ +/g).length > 1 || key.split(/;/g).length > 1 || key.toLowerCase() !== key)
        throw new Error(
          `CQL injection detected. Request denied. \nTable: ${table} \nID: ${id} \nData: ${inspect(data)}`
        )

      query += comma + `${key} = ${inspect(value)}`
    })
    query += ` WHERE id = ${inspect(id)}`

    if (!options.upsert) query += ' IF EXISTS'
    if (!options.upsert && options.condition) query += ` ${options.condition}`

    const result = await this.execute(query, options.params)
    const cacheKey = `${table}:${id}`

    if (!options.escapeCache && ENABLE_CACHE) {
      const isCached: boolean = await this.cache!.exists(cacheKey)
        .catch((e) => { console.error(e); return false })

      if (isCached) await this.cache!.del(cacheKey)
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

    let query = `DELETE ${selector} FROM ${DB_KEYSPACE}.${table} `

    if (options.timestamp) query += `USING TIMESTAMP ${options.timestamp} `
    query += `WHERE id = ${inspect(id)}`
    if (options.exists) query += ' IF EXISTS'
    else if (options.condition) query += ` ${options.condition}`

    const data = await this.execute(query, options.params)

    if (!options.escapeCache && ENABLE_CACHE)
      await this.cache!.del(`${table}:${id}`)
        .catch(this.errFn)

    return data
  }

  public execute(query: string, params?: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator