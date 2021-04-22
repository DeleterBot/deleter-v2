import BaseService from '@src/abstractions/BaseService'
import Discord from 'discord.js'
import Constants from '@src/utils/Constants'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import DeleterGuild from '@src/structures/djs/DeleterGuild'
import guildFirstWritableChannel from '@src/utils/guildFirstWritableChannel'
import DeleterEmbed from '@src/structures/DeleterEmbed'

export default class GulagService extends BaseService {

  isGulaged(id: Discord.Snowflake) {

    return this.deleter.db.get(Constants.gulagsTable, id)

  }

  async goGulag(id: Discord.Snowflake, reason: string) {

    if (!reason.endsWith('.') && !reason.endsWith('>')) reason += '.'

    await this.deleter.db.update(Constants.gulagsTable, id, { reason: reason }, { upsert: true })

  }

  sendGulagedMessage(guild: DeleterGuild, gulag: any) {

    const parser = new StringPropertiesParser()

    const description = parser.parse(
      `$phrase[${guild.locale}.deleter.global.gulag.owner.description`,
      {
        username: this.deleter.user!.username,
        reason: gulag.reason
      }
    )

    const embed = new DeleterEmbed()
      .setColor(this.deleter.options.color)
      .setDescription(description)

    const channel = guildFirstWritableChannel(guild)

    return channel?.send(embed)

  }

}
