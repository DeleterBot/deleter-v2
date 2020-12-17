import Discord from 'discord.js'
import ProcessEnv from "@/types/ProcessEnv";

import DotEnv from 'dotenv'
DotEnv.config()

const { TOTAL_SHARDS } = process.env as unknown as ProcessEnv

const ShardingManager = new Discord.ShardingManager('./src/shard', {
  totalShards: TOTAL_SHARDS
})

ShardingManager.spawn()