import Redis from 'redis'
import BaseService from '@/abstractions/BaseService'
import DeleterProcessEnv from '@/types/deleter/DeleterProcessEnv'
import { promisify } from 'util'
import DeleterDatabaseCache from '@/types/deleter/DeleterDatabaseCache'

const { REDIS_HOST, REDIS_PORT } = process.env as DeleterProcessEnv

class CachingService extends BaseService implements DeleterDatabaseCache {
  public connection: Redis.RedisClient
  private readonly getAsync: any
  private readonly setAsync: any

  constructor() {
    super()

    this.connection = Redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT
    })

    this.getAsync = promisify(this.connection.get).bind(this.connection)
    this.setAsync = promisify(this.connection.set).bind(this.connection)
  }

  public set(key: string, value: any) {
    return this.setAsync(key, value)
  }

  public get(key: string) {
    return this.getAsync(key)
  }
}

export default CachingService