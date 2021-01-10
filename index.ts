import 'module-alias/register.js'

import Discord from 'discord.js'

import DotEnv from 'dotenv'
DotEnv.config()

const shardingManager = new Discord.ShardingManager('./dist/src/shard.js', {
  totalShards: parseInt(process.env.TOTAL_SHARDS) || 'auto'
})

shardingManager.spawn()

process.on('unhandledRejection', (reason: string) => console.error(reason))