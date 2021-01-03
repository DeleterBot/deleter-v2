import Base from '@/abstractions/Base'
import DeleterClientOptions from '@/types/deleter/DeleterClientOptions'
import Discord from 'discord.js'

export default class Guild extends Base {
  public readonly prefix: string

  constructor(guild: Discord.Guild, data: Record<string, any> = {}) {
    super()

    this.prefix = data.prefix ?? (this.client.options as DeleterClientOptions).prefix
  }
}