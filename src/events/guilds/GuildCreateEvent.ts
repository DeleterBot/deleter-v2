import BaseEvent from '@src/abstractions/BaseEvent'
// import GulagService from '@src/services/misc/GulagService'
import DeleterGuild from '@src/structures/djs/DeleterGuild'

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.guilds.GuildCreateEvent', {
      name: 'guildCreate'
    })
  }

  async execute(guild: DeleterGuild) {

    return guild

    /*const gulagService = new GulagService()

    const gulag = await gulagService.isGulaged(guild.id)

    if (gulag) {
      gulagService.sendGulagedMessage(guild, gulag)?.then(guild.leave, guild.leave)
    }*/

  }
}
