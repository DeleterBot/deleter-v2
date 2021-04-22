import Cassandra, { DseClientOptions, errors, types } from 'cassandra-driver'
import BaseService from '@src/abstractions/BaseService'
import CachingService from '@src/services/db/CachingService'
import DatabaseGetOptions from '@src/types/database/DatabaseGetOptions'
import DatabaseUpdateOptions from '@src/types/database/DatabaseUpdateOptions'
import DatabaseDeleteOptions from '@src/types/database/DatabaseDeleteOptions'
import { inspect } from 'util'
import NoHostAvailableError = errors.NoHostAvailableError
import ResultSet = types.ResultSet
import * as fs from 'fs'
import * as util from 'util'
import Constants from '@src/utils/Constants'

const { DB_KEYSPACE } = process.env

const CASSANDRA_CLIENT_OPTIONS: DseClientOptions = {
  cloud: {
    secureConnectBundle: './secure-connect-deleterdb.zip'
  },
  credentials: {
    username: process.env.DB_USRN,
    password: process.env.DB_PSWD
  },
  socketOptions: {
    readTimeout: Constants.CASSANDRA_READ_TIMEOUT
  }
}

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client
  public cache: CachingService

  constructor() {
    super()

    this.connection = new Cassandra.Client(CASSANDRA_CLIENT_OPTIONS)

    this.cache = new CachingService()
  }

  public connect(createTables = false) {
    return this.connection.connect()
      .then(async () => {
        if (!process.env.DB_KEYSPACE) return
        if (!createTables) return

        const cqlPaths = [
          './src/cql/tables/hashes.cql',
          './src/cql/types/lang.cql',
          './src/cql/types/ignore.cql',
          './src/cql/tables/guilds.cql',
          './src/cql/tables/misc.cql',
          './src/cql/types/presence.cql',
          './src/cql/types/latest_presence.cql',
          './src/cql/tables/users.cql'
        ]

        const read = util.promisify(fs.readFile)

        for await (const path of cqlPaths) {
          console.info('executing ', path)
          await this.connection.execute(
            (await read(path, { encoding: 'utf-8' })).replace('?', process.env.DB_KEYSPACE).replace(/\r\n/g, '')
          )
        }

        return
      })
  }

  public async get<T = any>(table: string, id: string, options?: DatabaseGetOptions): Promise<T>
  public async get(table: string, id: string, options: DatabaseGetOptions = {}): Promise<any> {

    const cacheKey = `${table}:${id}`

    if (!options.escapeCache) {
      const cache = await this.cache.get(cacheKey)
      if (cache) {
        if (options.transform) return new options.transform(cache)
        else return cache
      }
    }

    const data = await this.execute(
      `SELECT ${options.selector || '*'} FROM ${DB_KEYSPACE}.${table}`
      + (options.everything ? '' : ` WHERE id = ${inspect(id)}`),
      options.params
    )

    if (options.raw) return data
    if (options.array) return data.rows

    if (!options.escapeCache && !options.selector)
      this.cache.set(cacheKey, options.everything ? data.rows : data.rows[0] ?? '')
        .catch(e => console.error(e))

    if (options.transform) return new options.transform(data.rows[0])

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

    if (!options.escapeCache) {
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
    selector: string | Array<string> = '',
    options: DatabaseDeleteOptions = {}
  ) {

    if (Array.isArray(selector)) selector = selector.join(', ')

    let query = `DELETE ${selector ? selector + ' ' : '' }`
      + `FROM ${DB_KEYSPACE}.${table} `

    if (options.timestamp) query += `USING TIMESTAMP ${options.timestamp} `
    query += `WHERE id = ${inspect(id)}`
    if (options.exists) query += ' IF EXISTS'
    else if (options.condition) query += ` ${options.condition}`

    const data = await this.execute(query, options.params)

    if (!options.escapeCache)
      await this.cache!.del(`${table}:${id}`)
        .catch(this.errFn)

    return data
  }

  public execute(query: string, params?: Array<string>): Promise<ResultSet> {
    return this.connection.execute(query, params, { readTimeout: Constants.CASSANDRA_READ_TIMEOUT })
      .catch(async e => {
        if (e instanceof NoHostAvailableError) {
          this.connection = new Cassandra.Client(CASSANDRA_CLIENT_OPTIONS)
          await this.connect()
          return this.connection.execute(query, params, { readTimeout: Constants.CASSANDRA_READ_TIMEOUT })
        } else throw e
      })
  }
}

export default DatabaseOperator
