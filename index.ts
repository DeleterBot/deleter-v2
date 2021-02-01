import 'module-alias/register.js'
import DotEnv from 'dotenv'
DotEnv.config()
import Discord from 'discord.js'
import api from '@api/api'

!async function _() {
  const shardingManager = new Discord.ShardingManager('./dist/src/shard.js', {
    totalShards: parseInt(process.env.TOTAL_SHARDS) || 'auto'
  })

  if (process.env.API_ENABLED === 'true') {
    await api(shardingManager)
  }

  return shardingManager.spawn()
}()

process.on('unhandledRejection', (reason: string) => console.error(reason))