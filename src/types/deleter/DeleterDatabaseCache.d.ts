import Redis from 'redis'
import { Collection } from 'discord.js'

export default interface DeleterDatabaseCache {
  connection: Redis.RedisClient | Collection<any, any>
}
