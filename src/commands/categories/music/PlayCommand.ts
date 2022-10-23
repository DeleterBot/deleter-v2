import BaseCommand from '@src/abstractions/BaseCommand'
import PlayCommandConfig from '@src/commands/categories/music/resources/configs/PlayCommandConfig'
import { Message } from 'discordoo'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import { MusicManagerError } from '@src/services/music/MusicManager'

export default class PlayCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.categories.music.PlayCommand', new PlayCommandConfig())
  }

  async execute(msg: Message, context: CommandExecutionContext): Promise<CommandExecutionResult> {
    const channel = '798943858145755236'
    const guild = msg.guildId
    if (msg.channelId !== channel || !guild)
      return new CommandExecutionResult('This command is only available in <#712719583961808936>!')
    const voice = '712719583961808936'

    const dispatch = await this.deleter.music.play(guild, channel, voice, context.args.join(' ')).catch(
      (err: MusicManagerError) => {
        return new CommandExecutionResult(err.message + ' code ' + err.code)
      }
    )

    if (dispatch instanceof CommandExecutionResult) return dispatch

    this.logger.log(undefined, dispatch.dispatcher.playing)
    return new CommandExecutionResult('playing thing ' + dispatch.dispatcher.playing?.info.title)
  }
}