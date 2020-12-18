import 'module-alias/register'

import Discord from 'discord.js'
import ProcessEnv from "@/types/ProcessEnv";

import DotEnv from 'dotenv'
DotEnv.config()

const { TOTAL_SHARDS } = process.env as unknown as ProcessEnv

const ShardingManager = new Discord.ShardingManager('./dist/src/shard.js', {
  totalShards: parseInt(TOTAL_SHARDS) || 'auto'
})

ShardingManager.spawn()