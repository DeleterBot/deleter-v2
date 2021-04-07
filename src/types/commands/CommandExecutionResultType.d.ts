import Discord from 'discord.js'
import DeleterEmbed from '@src/structures/DeleterEmbed'

interface CommandExecutionResultType {
  result: DeleterEmbed | string | Discord.EmojiResolvable | Discord.EmojiResolvable[] | undefined | null
  reply?: boolean
  react?: boolean
  options?: Discord.MessageOptions
  success?: boolean
}

export default CommandExecutionResultType
