import Base from '@src/abstractions/Base'
import CommandExecutionResultType from '@src/types/commands/CommandExecutionResultType'
import DeleterEmbed from '@src/structures/DeleterEmbed'
import { EmojiResolvable, MessageCreateOptions } from 'discordoo'

export default class CommandExecutionResult extends Base implements CommandExecutionResultType {
  public result: DeleterEmbed | string | undefined | null
  public options: MessageCreateOptions | undefined
  public react?: EmojiResolvable | EmojiResolvable[]
  public reply: boolean | undefined
  public success: boolean

  constructor(
    result: DeleterEmbed | string | EmojiResolvable | EmojiResolvable[] | undefined | null
  ) {
    super()

    if (result instanceof DeleterEmbed || [ 'string', 'undefined', 'null' ].includes(typeof result))
      this.result = result as DeleterEmbed | string | undefined | null
    else this.react = result as EmojiResolvable | EmojiResolvable[]

    this.success = true

    return this
  }

  public setResult(result: CommandExecutionResult['result']) {
    this.result = result
    return this
  }

  public setReact(condition = true) { // TODO: deprecated
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

  public setOptions(options: MessageCreateOptions) {
    this.options = options
    return this
  }

  public amendOptions(options: MessageCreateOptions) {

    if (this.options) Object.assign(this.options, options)
    else this.options = options

    return this
  }

}
