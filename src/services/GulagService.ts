import BaseService from '@src/abstractions/BaseService'
import Discord from 'discord.js'
import Constants from '@src/utils/Constants'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import DeleterGuild from '@src/structures/djs/DeleterGuild'
import guildFirstWritableChannel from '@src/utils/guildFirstWritableChannel'

export default class GulagService extends BaseService {

  isGulaged(id: Discord.Snowflake) {

    return this.client.db.get(Constants.gulagsTable, id)

  }

  async goGulag(id: Discord.Snowflake, reason: string) {

    if (!reason.endsWith('.') && !reason.endsWith('>')) reason += '.'

    await this.client.db.update(Constants.gulagsTable, id, { reason: reason }, { upsert: true })

  }

  sendGulagedMessage(guild: DeleterGuild, gulag: any) {

    const parser = new StringPropertiesParser()

    const description = parser.parse(
      `$phrase[${guild.locale}.deleter.global.gulag.owner.description`,
      {
        username: this.client.user!.username,
        reason: gulag.reason
      }
    )

    const embed = new Discord.MessageEmbed()
      .setColor(this.client.options.color)
      .setDescription(description)

    const channel = guildFirstWritableChannel(guild)

    return channel?.send(embed)

  }

}
