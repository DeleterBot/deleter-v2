import BaseCommand from '@src/abstractions/BaseCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import StringPropertiesParser from '@src/utils/StringPropertiesParser'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import HelpCommandConfig from '@src/commands/list/info/resources/configs/HelpCommandConfig'

export default class HelpCommand extends BaseCommand {
  constructor() {
    super('@deleter.commands.list.info.HelpCommand', new HelpCommandConfig())
  }

  async execute(msg: DeleterCommandMessage, info: Info): Promise<CommandExecutionResult> {

    console.log(this.standard(msg, info))

    return new CommandExecutionResult('хелпа нет, иди ты нахер').setReply()

  }

  private standard(msg: DeleterCommandMessage, info: Info) {

    const commands: Record<string, Array<string>> = {}

    this.client.cache.commands.forEach(command => {

      const category = command[info.guild.lang.interface].category

      if (!commands[category]) commands[category] = []

      commands[category].push(command[info.guild.lang.commands])

    })

    return commands

  }
}
