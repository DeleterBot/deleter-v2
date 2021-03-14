import 'module-alias/register.js'

import DeleterClient from '@src/structures/DeleterClient'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
import DeleterGuild from '@src/structures/djs/DeleterGuild'
import Discord from 'discord.js'

Discord.Structures.extend('Guild', () => DeleterGuild)

global.Discord = Discord

const { TOKEN } = process.env
let options: DeleterClientOptions | undefined

try {
  options = require('@src/options').default
} catch (e) {} // eslint-disable-line no-empty

const deleter = new DeleterClient(TOKEN, options)
deleter.load()
  .then(() => {
    console.log(`shard ${deleter.shard?.ids} | lol, work`)
  })

process.on('unhandledRejection', (reason: string) => console.error(reason))
process.on('uncaughtException', (reason: any) => console.error(reason))
