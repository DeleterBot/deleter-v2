import UserMentionParsingOptions from '@src/types/parsers/UserMentionParsingOptions'
import { GuildMember, Message } from 'discordoo'

export default class MentionsParser {
  public static readonly isUtils = true

  static user(
    msg: Message,
    content: string | string[],
    options: UserMentionParsingOptions = { parseIdOnly: false, replaceSpaces: true, returnId: false, useRegex: false }
  ): GuildMember | string | null {

    if (Array.isArray(content)) content = content.join(' ')

    let id: string | undefined

    if (options.useRegex) {
      const regex = options.parseIdOnly ? /\d{17,19}/ : /<@!?\d{17,19}>/

      id = regex.exec(content)?.[0]?.[0]

      if (!id) return null
    } else {

      if (content.length >= 3) {

      }
    }

    if (id) {

    }

    return null

  }
}
