import BaseService from '@src/abstractions/BaseService'
import Constants from '@src/utils/other/Constants'
import StringPropertiesParser from '@src/utils/parsers/StringPropertiesParser'
import DeleterGuild from '@src/structures/ddoo/DeleterGuild'
import guildFirstWritableChannel from '@src/utils/functions/guildFirstWritableChannel'
import DeleterEmbed from '@src/structures/DeleterEmbed'
import { getGuildLocale } from '@src/utils/functions/getGuildLocale'

export default class GulagService extends BaseService {

  isGulaged(id: string) {

    return this.deleter.db.get(Constants.gulagsTable, id)

  }

  async goGulag(id: string, reason: string) {

    if (!reason.endsWith('.') && !reason.endsWith('>')) reason += '.'

    await this.deleter.db.update(Constants.gulagsTable, id, { reason: reason }, { upsert: true })

  }

  async sendGulagedMessage(guild: DeleterGuild, gulag: any) {

    const parser = new StringPropertiesParser()

    const description = parser.parse(
      `$phrase[${getGuildLocale(guild)}.deleter.global.gulag.owner.description`,
      {
        username: this.deleter.user!.username,
        reason: gulag.reason
      }
    )

    const embed = new DeleterEmbed()
      .setColor(this.deleter.options.color)
      .setDescription(description)

    const channel = await guildFirstWritableChannel(guild)

    // @ts-ignore TODO
    return channel?.send({ embeds: [ embed ] })

  }

}
