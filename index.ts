import 'module-alias/register.js'

import Discord from 'discord.js'
import DeleterProcessEnv from '@/types/deleter/DeleterProcessEnv'

import DotEnv from 'dotenv'
DotEnv.config()

const { TOTAL_SHARDS } = process.env as DeleterProcessEnv

const shardingManager = new Discord.ShardingManager('./dist/src/shard.js', {
  totalShards: parseInt(TOTAL_SHARDS) || 'auto'
})

shardingManager.spawn()

process.on('unhandledRejection', (reason: string) => console.error(reason))