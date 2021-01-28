import Redis from 'redis'
import BaseService from '@src/abstractions/BaseService'
import { promisify } from 'util'
import DeleterDatabaseCache from '@src/types/deleter/DeleterDatabaseCache'

class CachingService extends BaseService implements DeleterDatabaseCache {
  public connection: Redis.RedisClient
  private readonly getAsync: any
  private readonly setAsync: any
  private readonly delAsync: any
  private readonly xstAsync: any

  constructor() {
    super()

    const { REDIS_HOST, REDIS_PORT } = process.env

    this.connection = Redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT
    })

    this.getAsync = promisify(this.connection.get).bind(this.connection)
    this.setAsync = promisify(this.connection.set).bind(this.connection)
    this.delAsync = promisify(this.connection.del).bind(this.connection)
    this.xstAsync = promisify(this.connection.exists).bind(this.connection)

    this.connection.on('error', (reason: string) => console.error(reason))

    return this
  }

  public set(key: string, value: Record<string, any> | string): Promise<boolean> {

    if (typeof value === 'object') value = JSON.stringify(value)
    else if (typeof value !== 'string') throw new Error('cannot cache anything except strings and objects')

    return this.setAsync(key, value)
  }

  public async get(key: string): Promise<Record<string, any> | string> {

    const data = await this.getAsync(key)
    let result

    try {
      result = JSON.parse(data)
    } catch (e) {
      result = data
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
