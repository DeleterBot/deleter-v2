import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import HelpCommandConfig from '@src/commands/categories/info/resources/configs/HelpCommandConfig'
import DeleterEmbed from '@src/structures/DeleterEmbed'
import Constants from '@src/utils/Constants'
import Discord, { Collection } from 'discord.js'
import withACapital from '@src/utils/withACapital'
import CommandDetails from '@src/types/commands/CommandDetails'
import SubCommandsFinder from '@src/utils/SubCommandsFinder'
import CommandsFinder from '@src/utils/CommandsFinder'

export default class HelpCommand extends BaseCommand {
  private root!: string
  private globalRoot!: string
  private empty!: string
  private nullish!: string
  private dev: Record<any, any> = {}
  private parser!: StringPropertiesParser
  private lang!: string

  constructor() {
    super('@deleter.commands.categories.info.HelpCommand', new HelpCommandConfig())
  }

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {

    this.root = `${info.guild.lang.interface}.deleter.commands.categories.info.command.help`
    this.globalRoot = `${info.guild.lang.interface}.deleter.global`

    this.parser = new StringPropertiesParser()
    this.lang = info.additionalLanguage || info.guild.lang.commands

    this.empty = withACapital(this.parser.parse(`$keyword[${this.globalRoot}.empty's]`))
    this.nullish = this.parser.parse(`$phrase[${this.globalRoot}.nullish.description]`)

    const dev: Discord.User | Record<string, any>
      = await this.deleter.users.fetch(this.deleter.owner!).catch(() => { return {} })

    this.dev.tag = dev.tag ?? Constants.nobody
    this.dev.avatar = dev.displayAvatarURL?.({ dynamic: true })

    let embed: DeleterEmbed

    if (!info.args[0]) embed = this.standard(info)
    else {
      const commands = this.deleter.cache.commands.filter(c => (
        c.translations[this.lang].category === info.args[0].toLowerCase()
      ))

      if (commands.size) embed = this.category(info, commands)

      const commandsFinder = new CommandsFinder(this.deleter.cache.commands)

      const command = commandsFinder.find(info.args[0], this.lang)

      if (command) embed = this.individual(info, command)

      if (!embed!) embed = this.standard(info)
    }

    embed
      .setColor(info.guild.color)
      .setThumbnail(this.deleter.user.displayAvatarURL({ size: 256, format: 'png' }))
      .setFooter(
        this.parser.parse(`$phrase[${this.root}.footer.value]`, {
          dev: this.dev.tag
        }), this.dev.avatar
      )

    return new CommandExecutionResult(embed)
  }

  private standard(info: Info) {

    const commands: Record<string, Array<Record<string, any>>> = {}

    this.deleter.cache.commands.forEach(command => {

      const category = command.translations[info.guild.lang.interface].category

      if (!commands[category]) commands[category] = []

      commands[category].push(command.translations[info.guild.lang.commands])

    })

    const embed = new DeleterEmbed()
      .setTitle(
        this.parser.parse(`$phrase[${this.root}.standard.title]`)
      )
      .setDescription(
        this.parser.parse(`$phrase[${this.root}.standard.description]`, {
          command: this.deleter.cache.commands.random().translations[info.guild.lang.commands].name,
          help: (this.translations as any)[info.guild.lang.commands].name,
          prefix: info.guild.prefix,
          site: Constants.site
        })
      )

    let description = ''

    Object.entries(commands)
      .sort((c1, c2) => c2[1].length - c1[1].length)
      .forEach(category => {
        description += `**${withACapital(category[0])}**\n`
        description += category[1].map(command => `\`${info.guild.prefix}${command.name}\``).join(' ')
        description += '\n\n'
      })

    return embed.amendDescription(description)

  }

  private category(info: Info, commands: Collection<string, any>) {
    const category = commands.first()!.translations[info.guild.lang.interface].category

    const embed = new DeleterEmbed()
      .setTitle(
        this.parser.parse(`$phrase[${this.root}.category.title]`, {
          category: category
        })
      )
      .setDescription(
        this.parser.parse(`$phrase[${this.root}.category.description]`, {
          category: withACapital(category)
        })
      )

    let description = ''

    commands.forEach(c => {
      const command = c.translations[info.guild.lang.commands]

      description += `\`${info.guild.prefix}${command.name}\``

      if (command.aliases.length)
        description += ' **|** ' + command.aliases
          .map((a: string) => `\`${info.guild.prefix}${a}\``)
          .join(' **|** ') + '\n'
      else description += '\n'

      description += c.translations[info.guild.lang.interface].description ||
        this.parser.parse(`$phrase[${this.globalRoot}.nullish.description]`)

      description += '\n\n'
    })

    return embed.amendDescription(description)
  }

  private individual(info: Info, command: BaseCommand) {
    const commandsLanguageCommand: CommandDetails = (command.translations as any)[info.guild.lang.commands],
      interfaceLanguageCommand: CommandDetails = (command.translations as any)[info.guild.lang.interface]

    const subCommandsList =
      new SubCommandsFinder(this.deleter.cache.subCommands).findUsingSlaveOf(commandsLanguageCommand.name)

    let subCommands = ''

    subCommandsList.forEach(subCommand => {
      const commandsLanguageSubCommand: CommandDetails = (subCommand.translations as any)[info.guild.lang.commands],
        interfaceLanguageSubCommand: CommandDetails = (subCommand.translations as any)[info.guild.lang.interface]

      subCommands += `\`${commandsLanguageSubCommand.name}\``

      if (commandsLanguageSubCommand.aliases) subCommands += ' **|** '
        + commandsLanguageSubCommand.aliases?.map(a => `\`${a}\``).join(' **|** ')

      if (interfaceLanguageSubCommand.description)
        subCommands += ` — ${interfaceLanguageSubCommand.description}\n`
      else subCommands += ` — ${this.nullish}\n`
    })

    let flags = ''

    if (command.flags || commandsLanguageCommand.flags) {
      Object.entries(
        Object.assign({}, command.flags || {}, commandsLanguageCommand.flags || {})
      ).forEach(flag => {
        const details = flag[1]

        if (typeof details === 'string')
          flags += `\`--${flag[0]}\` — ${this.nullish}\n`
        else {
          if (details.alias) flags += `\`-${details.alias}\`  **|** `
          flags += `\`--${flag[0]}\``

          if (details.description) flags += ` — ${details.description}\n`
          else flags += ` — ${this.nullish}\n`
        }
      })
    }

    return new DeleterEmbed()
      .setTitle(
        this.parser.parse(`$phrase[${this.root}.individual.title]`, {
          command: commandsLanguageCommand.name
        })
      )
      .setDescription(
        this.parser.parse(`$phrase[${this.root}.individual.description]`, {
          category: withACapital(interfaceLanguageCommand.category || this.empty),

          aliases: `\`${commandsLanguageCommand.name}\``
          + (commandsLanguageCommand.aliases?.length
            ? ' **|** '
            + commandsLanguageCommand.aliases?.map(a => `\`${a}\``).join(' **|** ')
            : ''),

          description: withACapital(interfaceLanguageCommand.description
            || this.parser.parse(`$keyword[${this.globalRoot}.empty]`)),

          subCommands: subCommands || this.empty + '\n',
          flags: flags || this.empty
        })
      )

  }
}
