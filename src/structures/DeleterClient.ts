import { Client, ClientUser, Collection } from 'discordoo'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
import DeleterClientCache from '@src/types/deleter/DeleterClientCache'
import Gatherer from '@src/utils/finders/Gatherer'
import DatabaseOperator from '@src/services/store/DatabaseOperator'
import Logger from '@src/utils/other/Logger'
import { ExtendedMessage } from '@src/structures/ExtendedMessage'

class DeleterClient extends Client {
  public owner: string | undefined
  public cache!: DeleterClientCache
  public db!: DatabaseOperator
  declare public options: DeleterClientOptions
  declare public user: ClientUser
  public logger: Logger = new Logger()
  private deleter: DeleterClient = this

  constructor(token: string, options: DeleterClientOptions) {
    super(token, { ...options, extenders: [ { extender: ExtendedMessage, entity: 'Message' }] })
    this.owner = options?.owner || 'nobody'
  }

  async load() {
    global.deleter = this

    this.logger.log(undefined, 'gathering cache')
    this.logger.clear = true

    this.cache = {
      cd: new Collection<string, any>(),
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
    return this.start()
  }
}

export default DeleterClient
