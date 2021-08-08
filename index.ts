import 'module-alias/register.js'

import DotEnv from 'dotenv'
DotEnv.config()

import Discord from 'discord.js'
import api from '@api/api'
import Logger from '@src/utils/other/Logger'

const logger = new Logger()

!async function _() {
  const shardingManager = new Discord.ShardingManager('./dist/src/shard.js', {
    totalShards: parseInt(process.env.TOTAL_SHARDS) || 'auto'
  })

  if (process.env.API_ENABLED === 'true') {
    logger.clear = true
    logger.log(undefined, 'starting rest api')
    logger.clear = false
    await api(shardingManager)
    logger.log(undefined, 'shards are starting')
  } else {
    logger.clear = true
    logger.log(undefined, 'shards are starting')
    logger.clear = false
  }

  return shardingManager.spawn()
    .then(shards => {
      logger.success(
        undefined,
        'all shards done,', shards.size, shards.size > 1 ? 'shards' : 'shard', 'running'
      )
    })
    .catch(e => logger.error(
      undefined,
      'error when spawning shards:',
      e
    ))
}()

function catchError(...reason: any) {
  logger.clear = false
  logger.error(undefined, ...reason)
}

process.on('unhandledRejection', catchError)
process.on('uncaughtException', catchError)
