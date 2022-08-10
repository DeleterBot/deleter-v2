import BaseCommand from '@src/abstractions/BaseCommand'
import UserInfoCommandConfig from '@src/commands/categories/info/resources/configs/UserInfoCommandConfig'
import { Message } from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import DeleterRawUser from '@src/structures/DeleterRawUser'
import Constants from '@src/utils/other/Constants'
import DeleterEmbed from '@src/structures/DeleterEmbed'
import StringPropertiesParser from '@src/utils/parsers/StringPropertiesParser'
import Moment from 'moment'
import DeleterRawUserPresence from '@src/types/deleter/DeleterRawUserPresence'

// TODO: rewrite shitcode
export default class UserInfoCommand extends BaseCommand {
  private presences!: DeleterRawUserPresence[]

  constructor() {
    super('@deleter.commands.categories.info.UserInfoCommand', new UserInfoCommandConfig())
  }

  async execute(msg: Message, context: CommandExecutionContext): Promise<CommandExecutionResult> {

    const user = await this.deleter.db.get<DeleterRawUser>(Constants.usersTable, msg.authorId, {
      transform: DeleterRawUser
    })
    const author = await msg.author()

    if (!user.id || !author) return new CommandExecutionResult('you don\'t exist...')

    const parser = new StringPropertiesParser(),
      root = `${context.guild.lang.interface}.deleter.commands.categories.info.command.user`

    Moment.locale(context.guild.lang.interface)

    this.presences = user.presences

    let description = '', title = ''

    if (user.presences.length) {

      title += parser.parse(`$phrase[${root}.title]`, {
        start: Moment(user.presencesStartedTimestamp)
          .format(Constants.getMomentFormat('calendar', context.guild.lang.interface)),
        nick: author.username,
        gendered_was: parser.parse(`$keyword[${context.guild.lang.interface}.deleter.global.${user.gender}.was]`)
      })

      const online = this.findStatus('online'),
        offline = this.findStatus('offline'),
        idle = this.findStatus('idle'),
        dnd = this.findStatus('dnd'),
        now = Date.now()

      if (online) description += parser.parse(`$phrase[${root}.description.online]`, {
        online: this.duration(now - online.played)
      }) + '\n'

      if (offline) description += parser.parse(`$phrase[${root}.description.offline]`, {
        offline: this.duration(now - offline.played)
      }) + '\n'

      if (idle) description += parser.parse(`$phrase[${root}.description.idle]`, {
        idle: this.duration(now - idle.played),
        gendered_idle: parser.parse(`$keyword[${context.guild.lang.interface}.deleter.global.${user.gender}.idle]`)
      }) + '\n'

      if (dnd) description += parser.parse(`$phrase[${root}.description.dnd]`, {
        dnd: this.duration(now - dnd.played)
      }) + '\n'

    } else description = parser.parse(`$phrase[${root}.nullishdata]`)

    const embed = new DeleterEmbed()
      .setColor(context.guild.color)
      .setTitle(title)
      .setDescription(description)
    return new CommandExecutionResult(embed)

  }

  duration(num: number) {
    const agoRegExp = / (ago|назад)/gi

    return Moment().to(Moment(num)).replace(agoRegExp, '')
  }

  findStatus(status: string): DeleterRawUserPresence | undefined {
    return this.presences.find(p => p.class === 'status' && p.name === status)
  }
}
