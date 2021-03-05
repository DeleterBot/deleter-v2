import Cassandra, { errors } from 'cassandra-driver'
import BaseService from '@src/abstractions/BaseService'
import CachingService from '@src/services/CachingService'
import DatabaseGetOptions from '@src/types/database/DatabaseGetOptions'
import DatabaseUpdateOptions from '@src/types/database/DatabaseUpdateOptions'
import DatabaseDeleteOptions from '@src/types/database/DatabaseDeleteOptions'
import { inspect } from 'util'
import NoHostAvailableError = errors.NoHostAvailableError

const { DB_KEYSPACE } = process.env
let { CACHE_ENABLED } = process.env

// @ts-ignore
CACHE_ENABLED = CACHE_ENABLED === 'true'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client
  public cache: CachingService | undefined

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

    if (CACHE_ENABLED) this.cache = new CachingService()

    this.connection.on('error', (e: any) => {
      if (e instanceof NoHostAvailableError) {
        this.connection.shutdown()
          .then(() => this.connection.connect())
      } else console.error(e)
    })
  }

  public connect() {
    return this.connection.connect()
  }

  public async get(table: string, id: string, options: DatabaseGetOptions = {}) {

    const cacheKey = `${table}:${id}`

    if (!options.escapeCache && CACHE_ENABLED) {
      const cache = await this.cache!.get(cacheKey)
      if (cache) return cache
    }

    const data = await this.execute(
      `SELECT ${options.selector || '*'} FROM ${DB_KEYSPACE}.${table}`
      + (options.everything ? '' : ` WHERE id = ${inspect(id)}`),
      options.params
    )

    if (options.raw) return data
    if (options.array) return data.rows

    if (!options.escapeCache && !options.selector && CACHE_ENABLED)
      this.cache!.set(cacheKey, options.everything ? data.rows : data.rows[0] ?? '')
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

      query += comma + `${key} = ${inspect(JSON.parse(JSON.stringify(value)), { depth: undefined })}`
    })
    query += ` WHERE id = ${inspect(id)}`

    if (!options.upsert) query += ' IF EXISTS'
    if (!options.upsert && options.condition) query += ` ${options.condition}`

    const result = await this.execute(query, options.params)
    const cacheKey = `${table}:${id}`

    if (!options.escapeCache && CACHE_ENABLED) {
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

    if (!options.escapeCache && CACHE_ENABLED)
      await this.cache!.del(`${table}:${id}`)
        .catch(this.errFn)

    return data
  }

  public execute(query: string, params?: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator
