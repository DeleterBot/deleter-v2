import Redis from 'redis'

export default interface DeleterDatabaseCache {
  connection: Redis.RedisClient
}