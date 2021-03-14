import Abstract from '@api/abstractions/abstract'
import getShardID from '@api/utils/getShardID'

export default class GuildPerms extends Abstract {
  public guildID: string
  public userID: string

  constructor(guildID: string, userID: string) {
    super()

    this.guildID = guildID
    this.userID = userID
  }

  check() {
    const shardID = getShardID(this.guildID, this.manager.shards.size)

    return this.manager.shards.get(shardID)
      ?.eval(`
        client.guilds.cache.get('${this.guildID}')
          ?.members.fetch('${this.userID}')
          .then(member => {
            if (member.permissions.has(8) || member.guild.owner.user.id === member.user.id)
              return true
            return false
          })
          .catch(() => {
            return false
          })
      `).catch(() => {
        return false
      })
  }
}
