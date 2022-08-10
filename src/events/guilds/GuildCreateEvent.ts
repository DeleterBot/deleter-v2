import BaseEvent from '@src/abstractions/BaseEvent'
// import GulagService from '@src/services/misc/GulagService'

import { GuildCreateEventContext } from 'discordoo/types/src/events/guild/ctx'

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.guilds.GuildCreateEvent', {
      name: 'guildCreate'
    })
  }

  async execute(ctx: GuildCreateEventContext) {

    return ctx.guild

    /*const gulagService = new GulagService()

    const gulag = await gulagService.isGulaged(guild.id)

    if (gulag) {
      gulagService.sendGulagedMessage(guild, gulag)?.then(guild.leave, guild.leave)
    }*/

  }
}
