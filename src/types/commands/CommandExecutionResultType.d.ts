import Discord from 'discord.js'

interface CommandExecutionResultType {
  result: Discord.MessageEmbed | string | Discord.EmojiResolvable | Discord.EmojiResolvable[] | undefined | null
  reply?: boolean
  react?: boolean
  options?: Discord.MessageOptions,
  success?: boolean
}

export default CommandExecutionResultType