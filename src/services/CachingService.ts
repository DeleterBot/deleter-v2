import Redis from 'redis'
import BaseService from '@src/abstractions/BaseService'
import { promisify } from 'util'
import DeleterDatabaseCache from '@src/types/deleter/DeleterDatabaseCache'
import { Collection } from 'discord.js'

class CachingService extends BaseService implements DeleterDatabaseCache {
  public connection: Redis.RedisClient | Collection<any, any>
  private readonly getAsync: any
  private readonly setAsync: any
  private readonly delAsync: any
  private readonly xstAsync: any

  constructor() {
    super()

    const { REDIS_HOST, REDIS_PORT } = process.env

    if (REDIS_HOST && REDIS_PORT) {
      this.connection = Redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT
      })

      this.getAsync = promisify(this.connection.get).bind(this.connection)
      this.setAsync = promisify(this.connection.set).bind(this.connection)
      this.delAsync = promisify(this.connection.del).bind(this.connection)
      this.xstAsync = promisify(this.connection.exists).bind(this.connection)

      this.connection.on('error', (reason: string) => console.error(reason))
    } else {
      this.connection = new Collection()

      this.getAsync = this.connection.get
      this.setAsync = this.connection.set
      this.delAsync = this.connection.delete
      this.xstAsync = this.connection.has
    }

    return this
  }

  public set(key: string, value: Record<string, any> | string | Array<any>): Promise<boolean> {

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
      result = {}
    }

    return result
  }

  public del(key: string): Promise<boolean> {
    return this.delAsync(key)
  }

  public exists(key: string): Promise<boolean> {
    return this.xstAsync(key)
  }
}

export default CachingService
