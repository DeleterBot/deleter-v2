import 'module-alias/register'

import Deleter from '@/structures/Client'
import ProcessEnv from '@/types/ProcessEnv'
import DeleterClientOptions from '@/types/DeleterClientOptions'

const { TOKEN } = process.env as unknown as ProcessEnv
let options: DeleterClientOptions | undefined

try {
  options = require('@/options').default
} catch (e) {} // eslint-disable-line no-empty

const deleter = new Deleter(TOKEN, options)
deleter.load()
  .then(() => {
    console.log(`shard ${deleter.shard?.ids}: lol, work`)
  })