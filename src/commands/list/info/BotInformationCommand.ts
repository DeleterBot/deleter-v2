import BaseCommand from '@src/abstractions/BaseCommand'
import Discord from 'discord.js'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Info from '@src/types/Info'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import Constants from '@src/utils/Constants'

export default class BotInformationCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.BotInformationCommand', {
      name: 'info',
      ru: {
        name: 'инфо',
        category: 'информация'
      },
      en: {
        name: 'info',
        category: 'information'
      },
      gg: {
        name: 'инфа',
        category: 'информейшн',
        aliases: [ 'инфо' ]
      },
      clientPermissions: [ 'EMBED_LINKS' ]
    })
  }

  async execute(msg: Discord.Message, info: Info): Promise<CommandExecutionResult> {

    const pckg: Record<string, any> = require('@root/package.json')

    const parser = new StringPropertiesParser(),

      root = `${info.guild.lang.interface}.deleter.commands.list.info.command.info`,
      dev: Discord.User | Record<any, any>
        = await this.client.users.fetch(this.client.owner!).catch(() => { return {} }),

      { site, docs, supportServer } = Constants

    const
      description = parser.parse(
        `$phrase[${root}.desc]`,
        {
          username: this.client.user!.username,
          mention: this.client.user!.toString(),
          prefix: info.guild.prefix,
          help: this.client.cache.commands
            .find(c => c?.name === 'help')![info.guild.lang.commands]?.name
        }
      ),
      versionsTitle = parser.parse(
        `$phrase[${root}.versions.title]`
      ),
      versionsValue = parser.parse(
        `$phrase[${root}.versions.value]`,
        {
          nodejs: process.version.replace('v', ''),
          djs: Discord.version,
          deleter: pckg.version,
          username: this.client.user!.username.toLowerCase(),
          ts: pckg.devDependencies.typescript.replace('^', ''),
          cassandra: pckg.dependencies['cassandra-driver'].replace('^', '')
        }
      ),
      linksTitle = parser.parse(
        `$phrase[${root}.links.title]`
      ),
      linksValue = parser.parse(
        `$phrase[${root}.links.value]`,
        {
          site: site,
          id: this.client.user!.id,
          server: supportServer,
          docs: docs
        }
      ),
      footerValue = parser.parse(
        `$phrase[${root}.footer.value]`,
        {
          dev: dev.tag ?? 'nobody#0000'
        }
      )

    const embed = new Discord.MessageEmbed()
      .setColor(info.guild.color)
      .setDescription(description)
      .setThumbnail(this.client.user!.displayAvatarURL({ size: 256, format: 'png' }))
      .addField(linksTitle, linksValue, true)
      .addField(versionsTitle, versionsValue, true)
      .setFooter(footerValue, dev.displayAvatarURL?.({ dynamic: true }))

    return new CommandExecutionResult(embed)
  }
}