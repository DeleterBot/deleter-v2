import 'module-alias/register'

import Discord from 'discord.js'
import DeleterClientOptions from '@/types/DeleterClientOptions'
import DeleterClientCache from '@/types/DeleterClientCache'
import Gatherer from '@/services/GathererService'

class Deleter extends Discord.Client {
  public token: string
  public owner: string | Array<string>
  // @ts-ignore
  public cache: DeleterClientCache

  constructor(token: string, options?: DeleterClientOptions) {
    super(options)
    this.token = token
    this.owner = options?.owner || 'nobody'
  }

  load() {
    // @ts-ignore
    global.client = this

    this.cache = {
      commands: Gatherer.loadCommands(),
      events: Gatherer.loadEvents()
    }

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute.bind(e))
    })

    return this.login(this.token)
  }
}

export default Deleter