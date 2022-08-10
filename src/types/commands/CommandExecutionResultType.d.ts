import DeleterEmbed from '@src/structures/DeleterEmbed'
import { EmojiResolvable, MessageCreateOptions } from 'discordoo'

interface CommandExecutionResultType {
  result: DeleterEmbed | string | undefined | null
  reply?: boolean
  react?: EmojiResolvable | EmojiResolvable[]
  options?: MessageCreateOptions
  success?: boolean
}

export default CommandExecutionResultType
