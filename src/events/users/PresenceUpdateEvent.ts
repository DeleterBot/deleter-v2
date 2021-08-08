import BaseEvent from '@src/abstractions/BaseEvent'
import Discord from 'discord.js'
import Constants from '@src/utils/other/Constants'
import DeleterRawUser from '@src/structures/DeleterRawUser'

export default class PresenceUpdateEvent extends BaseEvent {
  constructor() {
    super('@deleter.events.users.PresenceUpdateEvent', {
      name: 'presenceUpdate'
    })
  }

  async execute(lastPresence: Discord.Presence, recentPresence: Discord.Presence) {

    const user = await this.deleter.db.get<DeleterRawUser>(Constants.usersTable, recentPresence.userId, {
      transform: DeleterRawUser
    })

    if (!user.id) return

    if (user.presencesEnabled) {

      if (user.latestStatusPresence && (
        (lastPresence && lastPresence.status !== recentPresence.status) ||
        (user.latestStatusPresence.name !== recentPresence.status)
      )) {

        const status = user.latestStatusPresence.name,
          index = user.presences.findIndex((p: any) => p.class === 'status' && p.name === status)

        let presence = user.presences[index]

        if (presence) {
          presence.played += (Date.now() - new Date(user.latestStatusPresence.time).getTime())
        } else {
          presence = {
            name: status,
            class: 'status',
            played: Date.now() - new Date(user.latestStatusPresence.time).getTime()
          }

          if (presence.played <= 0) presence.played = 1000

          user.presences.push(presence)
        }

        return this.deleter.db.update(Constants.usersTable, user.id, {
          presences: user.presences,
          latest_status_presence: { name: recentPresence.status, time: Date.now() }
        })

      } else if (!user.latestStatusPresence) {
        return this.deleter.db.update(Constants.usersTable, user.id, {
          latest_status_presence: { name: recentPresence.status, time: Date.now() },
          presences_started: Date.now()
        })
      }

    } else if (!user.presencesEnabled && user.latestStatusPresence) {
      return this.deleter.db.delete(Constants.usersTable, user.id, 'latest_status_presence')
    }

  }
}
