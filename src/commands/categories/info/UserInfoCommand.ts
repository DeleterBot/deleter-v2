import BaseCommand from '@src/abstractions/BaseCommand'
import UserInfoCommandConfig from '@src/commands/categories/info/resources/configs/UserInfoCommandConfig'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import DeleterRawUser from '@src/structures/DeleterRawUser'
import Constants from '@src/utils/Constants'
import DeleterEmbed from '@src/structures/DeleterEmbed'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import Moment from 'moment'
import DeleterRawUserPresence from '@src/types/deleter/DeleterRawUserPresence'

export default class UserInfoCommand extends BaseCommand {
  private presences!: DeleterRawUserPresence[]

  constructor() {
    super('@deleter.commands.categories.info.UserInfoCommand', new UserInfoCommandConfig())
  }

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {

    const user = await this.deleter.db.get<DeleterRawUser>(Constants.usersTable, msg.author.id, {
      transform: DeleterRawUser
    })

    if (!user.id) return new CommandExecutionResult('you don\'t exist...')

    const parser = new StringPropertiesParser(),
      root = `${info.guild.lang.interface}.deleter.commands.categories.info.command.user`

    Moment.locale(info.guild.lang.interface)

    this.presences = user.presences

    let description = '', title = ''

    if (user.presences.length) {

      title += parser.parse(`$phrase[${root}.title]`, {
        start: Moment(user.presencesStartedTimestamp)
          .format(Constants.getMomentFormat('calendar', info.guild.lang.interface)),
        nick: msg.author.username,
        gendered_was: parser.parse(`$keyword[${info.guild.lang.interface}.deleter.global.${user.gender}.was]`)
      })

      const online = this.findStatus('online'),
        offline = this.findStatus('offline'),
        idle = this.findStatus('idle'),
        dnd = this.findStatus('dnd'),
        now = Date.now(),
        agoRegExp = / (ago|назад)/gi

      if (online) description += parser.parse(`$phrase[${root}.description.online]`, {
        online: Moment().to(Moment(now - online.played)).replace(agoRegExp, '')
      }) + '\n'

      if (offline) description += parser.parse(`$phrase[${root}.description.offline]`, {
        offline: Moment().to(Moment(now - offline.played)).replace(agoRegExp, '')
      }) + '\n'

      if (idle) description += parser.parse(`$phrase[${root}.description.idle]`, {
        idle: Moment().to(Moment(now - idle.played)).replace(agoRegExp, ''),
        gendered_idle: parser.parse(`$keyword[${info.guild.lang.interface}.deleter.global.${user.gender}.idle]`)
      }) + '\n'

      if (dnd) description += parser.parse(`$phrase[${root}.description.dnd]`, {
        dnd: Moment().to(Moment(now - dnd.played)).replace(agoRegExp, '')
      }) + '\n'

    } else description = parser.parse(`$phrase[${root}.nullishdata]`)

    const embed = new DeleterEmbed()
      .setColor(info.guild.color)
      .setTitle(title)
      .setDescription(description)
    return new CommandExecutionResult(embed)

  }

  findStatus(status: string): DeleterRawUserPresence | undefined {
    return this.presences.find(p => p.class === 'status' && p.name === status)
  }
}
