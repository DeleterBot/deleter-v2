import BaseCommand from '@src/abstractions/BaseCommand'
import Discord from 'discord.js'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Info from '@src/types/Info'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import Constants from '@src/utils/Constants'
import BotInformationCommandConfig from '@src/commands/list/info/resources/configs/BotInformationCommandConfig'
import DeleterEmbed from '@src/structures/DeleterEmbed'

export default class BotInformationCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.BotInformationCommand', new BotInformationCommandConfig())
  }

  async execute(msg: Discord.Message, info: Info): Promise<CommandExecutionResult> {

    const pckg: Record<string, any> = require('@root/package.json')

    const parser = new StringPropertiesParser(),

      root = `${info.guild.lang.interface}.deleter.commands.list.info.command.info`,
      dev: Discord.User | Record<any, any>
        = await this.deleter.users.fetch(this.deleter.owner!).catch(() => { return {} }),

      { site, docs, supportServer } = Constants

    const
      description = parser.parse(
        `$phrase[${root}.desc]`,
        {
          username: this.deleter.user!.username,
          mention: this.deleter.user!.toString(),
          prefix: info.guild.prefix,
          help: this.deleter.cache.commands
            .find(c => c?.name === 'help')!.translations[info.guild.lang.commands]?.name
        }
      ),
      versionsTitle = parser.parse(
        `$phrase[${root}.versions.title]`
      ),
      versionsValue = parser.parse(
        `$phrase[${root}.versions.value]`,
        {
          nodejs: process.version.replace('v', ''),
          lib: Discord.version,
          deleter: pckg.version,
          username: this.deleter.user.username.toLowerCase(),
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
          id: this.deleter.user.id,
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

    const embed = new DeleterEmbed()
      .setColor(info.guild.color)
      .setDescription(description)
      .setThumbnail(this.deleter.user!.displayAvatarURL({ size: 256, format: 'png' }))
      .addField(linksTitle, linksValue, true)
      .addField(versionsTitle, versionsValue, true)
      .setFooter(footerValue, dev.displayAvatarURL?.({ dynamic: true }))

    return new CommandExecutionResult(embed)

  }
}
