import Base from '@/abstractions/Base'
import CommandExecutionResultType from '@/types/commands/CommandExecutionResultType'
import Discord from 'discord.js'

export default class CommandExecutionResult extends Base implements CommandExecutionResultType {
  public readonly result: Discord.MessageEmbed | string |
    Discord.EmojiResolvable | Discord.EmojiResolvable[] | undefined | null
  public options: Discord.MessageOptions | undefined
  public react: boolean | undefined
  public reply: boolean | undefined

  constructor(
    result: Discord.MessageEmbed | string | Discord.EmojiResolvable | Discord.EmojiResolvable[] | undefined | null
  ) {
    super()
    this.result = result

    return this
  }

  public setReact(condition: boolean = true) {
    this.react = condition
    return this
  }

  public setReply(condition: boolean = true) {
    this.reply = condition
    return this
  }

  public setOptions(options: Discord.MessageOptions) {
    this.options = options
    return this
  }

  public amendOptions(options: Discord.MessageOptions) {
    Object.assign(this.options || {}, options)
    return this
  }

}