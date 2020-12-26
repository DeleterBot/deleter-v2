import 'module-alias/register'

import Discord from 'discord.js'
import DeleterProcessEnv from '@/types/deleter/DeleterProcessEnv'

import DotEnv from 'dotenv'
DotEnv.config()

const { TOTAL_SHARDS } = process.env as DeleterProcessEnv

const ShardingManager = new Discord.ShardingManager('./dist/src/shard.js', {
  totalShards: parseInt(TOTAL_SHARDS) || 'auto'
})

ShardingManager.spawn()