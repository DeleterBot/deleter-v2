import Redis from 'redis'
import BaseService from '@src/abstractions/BaseService'
import { promisify } from 'util'
import DeleterDatabaseCache from '@src/types/deleter/DeleterDatabaseCache'
import { Collection } from 'discord.js'
import exists from '@src/utils/functions/exists'

class CachingService extends BaseService implements DeleterDatabaseCache {
  public connection: Redis.RedisClient | Collection<any, any>
  private readonly getAsync: any
  private readonly setAsync: any
  private readonly delAsync: any
  private readonly xstAsync: any

  constructor() {
    super()

    const { REDIS_ENABLED, REDIS_HOST, REDIS_PORT } = process.env

    if (REDIS_ENABLED === 'true' && REDIS_HOST && REDIS_PORT) {
      this.connection = Redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT
      })

      this.getAsync = promisify(this.connection.get).bind(this.connection)
      this.setAsync = promisify(this.connection.set).bind(this.connection)
      this.delAsync = promisify(this.connection.del).bind(this.connection)
      this.xstAsync = promisify(this.connection.exists).bind(this.connection)

      this.connection.on('error', (reason: string) => this.logger.error('redis', reason))
    } else {
      this.connection = new Collection()

      this.getAsync = this.connection.get.bind(this.connection)
      this.setAsync = this.connection.set.bind(this.connection)
      this.delAsync = this.connection.delete.bind(this.connection)
      this.xstAsync = this.connection.has.bind(this.connection)
    }

    return this
  }

  public async set(key: string, value: Record<string, any> | string | Array<any>): Promise<boolean>
  public async set(key: string, value: any): Promise<boolean> {

    // runtime check
    if (typeof value === 'object') value = JSON.stringify(value)
    else if (typeof value !== 'string') throw new Error('cannot cache anything except strings, objects & arrays')

    return this.setAsync(key, value)
  }

  public async get(key: string) {

    const data = await this.getAsync(key)
    let result

    try {
      result = JSON.parse(data)
    } catch (e) {
      if (exists(data)) result = {}
    }

    return result
  }

  public async del(key: string): Promise<boolean> {
    return this.delAsync(key)
  }

  public async exists(key: string): Promise<boolean> {
    return this.xstAsync(key)
  }
}

export default CachingService
