import DotEnv from 'dotenv'
DotEnv.config()

import 'module-alias/register.js'

import DeleterClient from '@src/structures/DeleterClient'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
// import DeleterGuild from '@src/structures/djs/DeleterGuild'
import Discord from 'discordoo'
import Logger from '@src/utils/other/Logger'

// Discord.Structures.extend('Guild', () => DeleterGuild)

global.Discord = Discord

const { TOKEN } = process.env
let options: DeleterClientOptions

try {
  options = require('@src/options').default
  if (!options) throw new Error('options is not defined')
} catch (e) {
  new Logger().warn('shard.ts', 'cannot found client options. this may cause errors.')
}

const deleter = new DeleterClient(TOKEN, options!)
deleter.load()
  .then(() => {
    deleter.logger.success(undefined, 'successfully started')
    deleter.logger.clear = false
  })

function catchError(...reason: any) {
  deleter.logger.clear = false
  deleter.logger.error(undefined, ...reason)
}

process.on('unhandledRejection', catchError)
process.on('uncaughtException', catchError)
