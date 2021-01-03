import 'module-alias/register.js'

import DeleterClient from '@/structures/DeleterClient'
import DeleterProcessEnv from '@/types/deleter/DeleterProcessEnv'
import DeleterClientOptions from '@/types/deleter/DeleterClientOptions'

const { TOKEN } = process.env as DeleterProcessEnv
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