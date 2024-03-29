import BaseCommand from '@src/abstractions/BaseCommand'
import Discord, { version } from 'discordoo'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import StringPropertiesParser from '@src/utils/parsers/StringPropertiesParser'
import Constants from '@src/utils/other/Constants'
import BotInformationCommandConfig from '@src/commands/categories/info/resources/configs/BotInformationCommandConfig'
import DeleterEmbed from '@src/structures/DeleterEmbed'

export default class BotInformationCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.info.BotInformationCommand', new BotInformationCommandConfig())
  }

  async execute(msg: Discord.Message, context: CommandExecutionContext): Promise<CommandExecutionResult> {

    const pckg: Record<string, any> = require('@root/package.json')

    const parser = new StringPropertiesParser(),

      root = `${context.guild.lang.interface}.deleter.commands.categories.info.command.info`,
      dev: Discord.User | Record<any, any>
        = await this.deleter.users.fetch(this.deleter.owner!).then(u => u ? u : {}).catch(() => { return {} }),

      { site, docs, supportServer } = Constants

    const
      description = parser.parse(
        `$phrase[${root}.desc]`,
        {
          username: this.deleter.user.username,
          mention: this.deleter.user.toString(),
          prefix: context.guild.prefix,
          help: this.deleter.cache.commands
            .find(c => c?.name === 'help')!.translations[context.guild.lang.commands]?.name
        }
      ),
      versionsTitle = parser.parse(
        `$phrase[${root}.versions.title]`
      ),
      versionsValue = parser.parse(
        `$phrase[${root}.versions.value]`,
        {
          nodejs: process.version.replace('v', ''),
          lib: version,
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
      .setColor(context.guild.color)
      .setDescription(description)
      .setThumbnail(this.deleter.user.displayAvatarUrl({ size: 256, format: 'png' }))
      .addField({ name: linksTitle, value: linksValue, inline: true })
      .addField({ name: versionsTitle, value: versionsValue, inline: true })
      .setFooter(footerValue, dev.displayAvatarUrl?.({ dynamic: true }))

    return new CommandExecutionResult(embed)

  }
}
