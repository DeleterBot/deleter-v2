import Base from '@src/abstractions/Base'
import CommandExecutionResultType from '@src/types/commands/CommandExecutionResultType'
import Discord from 'discord.js'
import DeleterEmbed from '@src/structures/DeleterEmbed'

export default class CommandExecutionResult extends Base implements CommandExecutionResultType {
  public readonly result: DeleterEmbed | string |
    Discord.EmojiResolvable | Discord.EmojiResolvable[] | undefined | null
  public options: Discord.MessageOptions | undefined
  public react: boolean | undefined
  public reply: boolean | undefined
  public success: boolean

  constructor(
    result: DeleterEmbed | string | Discord.EmojiResolvable | Discord.EmojiResolvable[] | undefined | null
  ) {
    super()

    this.result = result
    this.success = true

    return this
  }

  public setReact(condition = true) {
    this.react = condition
    return this
  }

  public setReply(condition = true) {
    this.reply = condition
    return this
  }

  public setSuccess(condition = true) {
    this.success = condition
    return this
  }

  public setOptions(options: Discord.MessageOptions) {
    this.options = options
    return this
  }

  public amendOptions(options: Discord.MessageOptions) {

    if (this.options) Object.assign(this.options, options)
    else this.options = options

    return this
  }

}
