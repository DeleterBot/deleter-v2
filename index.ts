import 'module-alias/register.js'

import DotEnv from 'dotenv'
DotEnv.config()


import api from '@api/api'
import Logger from '@src/utils/other/Logger'
import { ShardingManager, ShardingModes } from 'discordoo'
import { resolve } from 'path'
import process from 'process'

const logger = new Logger()

!async function _() {
  const shardingManager = new ShardingManager({
    mode: ShardingModes.PROCESSES,
    shards: 1,
    file: resolve(process.cwd(), 'dist', 'src', 'shard.js'),
    shardsPerInstance: 1
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

  return shardingManager.start()
    .then(async manager => {
      logger.success(
        undefined,
        'all shards done,', manager.shards.size, manager.shards.size > 1 ? 'shards' : 'shard', 'running'
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
