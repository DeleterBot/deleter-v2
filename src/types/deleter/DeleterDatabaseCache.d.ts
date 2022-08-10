import Redis from 'redis'
import { Collection } from 'discordoo'

export default interface DeleterDatabaseCache {
  connection: Redis.RedisClient | Collection<any, any>
}
