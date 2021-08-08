import Discord, { ClientUser } from 'discord.js'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
import DeleterClientCache from '@src/types/deleter/DeleterClientCache'
import Gatherer from '@src/utils/finders/Gatherer'
import DatabaseOperator from '@src/services/store/DatabaseOperator'
import Logger from '@src/utils/other/Logger'

class DeleterClient extends Discord.Client {
  public token: string
  public owner: string | undefined
  public cache!: DeleterClientCache
  public db!: DatabaseOperator
  public options!: DeleterClientOptions
  public user!: ClientUser
  public logger: Logger = new Logger()
  private deleter: DeleterClient = this

  constructor(token: string, options: DeleterClientOptions) {
    super(options)
    this.token = token
    this.owner = options?.owner || 'nobody'
  }

  async load() {
    global.deleter = this

    this.logger.log(undefined, 'gathering cache')
    this.logger.clear = true

    this.cache = {
      cd: new Discord.Collection<string, any>(),
      commands: Gatherer.loadCommands(),
      events: Gatherer.loadEvents(),
      subCommands: Gatherer.loadSubCommands(),
      props: {
        keywords: Gatherer.loadProps('keywords'),
        phrases: Gatherer.loadProps('phrases')
      }
    }

    this.logger.log(undefined, 'applying events')
    this.cache.events.forEach(e => {
      this.on(e.name, e.execute)
    })

    this.logger.log(undefined, 'connecting to database')
    this.db = new DatabaseOperator()
    await this.db.connect()

    this.logger.log(undefined, 'connecting to discord')
    return this.login(this.token)
  }
}

export default DeleterClient
