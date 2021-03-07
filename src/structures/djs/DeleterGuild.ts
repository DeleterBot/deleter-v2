import Discord from 'discord.js'

export default class DeleterGuild extends Discord.Guild {
  public static readonly isExtendedClass = true

  get locale() {
    return this.region === 'russia' ? 'ru' : 'en'
  }

}
