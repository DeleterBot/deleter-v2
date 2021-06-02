import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import DeleterClient from '@src/structures/DeleterClient'
import Guild from '@src/structures/Guild'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandsFinder from '@src/utils/finders/CommandsFinder'

export default function detectCommand(
  deleter: DeleterClient,
  msg: DeleterCommandMessage,
  guild: Guild,
  context: CommandExecutionContext = {} as CommandExecutionContext
) {
  const commandsFinder = new CommandsFinder(deleter.cache.commands)

  const now = Date.now()
  const nowPrefix = `${now} `

  const mentionPrefix = msg.content.replace(
    new RegExp(String.raw`<@(!)?${deleter.user?.id}>( *)?`, 'i'), nowPrefix)
  const prefix =
    msg.content.startsWith(guild.prefix) ?
      guild.prefix :
      mentionPrefix.startsWith(nowPrefix) ?
        mentionPrefix.split(' ').shift() :
        false

  if (!prefix) return

  const content =
    prefix === nowPrefix.trim() ?
      mentionPrefix.slice(prefix.length + 1) :
      msg.content.slice(prefix.length)
  const args = content.split(/ +/)
  const maybeCommand = args.shift()?.toLowerCase()

  let command = commandsFinder.find(maybeCommand as string, guild.lang.commands)

  if (!command) {
    switch (guild.lang.commands) {
      case 'ru':
        command = commandsFinder.find(maybeCommand as string, 'en')
        if (command) context.additionalLanguage = 'en'
        break
      case 'en':
        command = commandsFinder.find(maybeCommand as string, 'ru')
        if (command) context.additionalLanguage = 'ru'
        break
    }

    if (command && !command.multiLang) command = null
  }

  context.guild = guild
  context.args = args
  context.flags = {}

  return {
    command,
    context
  }

}
