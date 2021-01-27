import 'module-alias/register.js'

import DeleterClient from '@/structures/DeleterClient'
import DeleterClientOptions from '@/types/deleter/DeleterClientOptions'
import Discord from 'discord.js'

global.Discord = Discord

const { TOKEN } = process.env
let options: DeleterClientOptions | undefined

try {
  options = require('@/options').default
} catch (e) {} // eslint-disable-line no-empty

const deleter = new DeleterClient(TOKEN, options)
deleter.load()
  .then(() => {
    console.log(`shard ${deleter.shard?.ids}: lol, work`)
  })

process.on('unhandledRejection', (reason: string) => console.error(reason))
process.on('uncaughtException', (reason: any) => console.error(reason))