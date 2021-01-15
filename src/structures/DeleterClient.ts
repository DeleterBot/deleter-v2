import Discord from 'discord.js'
import DeleterClientOptions from '@/types/deleter/DeleterClientOptions'
import DeleterClientCache from '@/types/deleter/DeleterClientCache'
import Gatherer from '@/services/GathererService'
import DatabaseOperator from '@/services/DatabaseOperator'

class DeleterClient extends Discord.Client {
  public token: string
  public owner: string | undefined
  // @ts-ignore
  public cache: DeleterClientCache
  // @ts-ignore
  public db: DatabaseOperator
  // @ts-ignore
  public options: DeleterClientOptions

  constructor(token: string, options?: DeleterClientOptions) {
    super(options)
    this.token = token
    this.owner = options?.owner || 'nobody'
  }

  load() {
    global.client = this

    this.cache = {
      commands: Gatherer.loadCommands(),
      events: Gatherer.loadEvents(),
      subCommands: Gatherer.loadSubCommands(),
      props: {
        keywords: Gatherer.loadProps('keywords'),
        phrases: Gatherer.loadProps('phrases')
      }
    }

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute.bind(e))
    })

    this.db = new DatabaseOperator()
    this.db.connect()

    return this.login(this.token)
  }
}

export default DeleterClient