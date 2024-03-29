import Discord from 'discordoo'
import BaseCommand from '@src/abstractions/BaseCommand'

const req = require

export default class CommandsFinder {
  public commands: Discord.Collection<string, BaseCommand>
  public static readonly isUtils: boolean = true

  constructor(commands: Discord.Collection<string, BaseCommand>) {
    this.commands = commands
  }

  findUsingName(name: string, lang = 'ru'): BaseCommand | null {
    const command = this.commands.find((c: any) => c?.translations?.[lang]?.name === name)

    if (command) return req(command.path.replace(/\./g, '/'))?.default
    return null
  }

  findUsingAlias(alias: string, lang = 'ru'): BaseCommand | null {
    const command = this.commands.find((c: any) => c?.translations?.[lang]?.aliases?.includes(alias))

    if (command) return req(command.path.replace(/\./g, '/'))?.default
    return null
  }

  find(nameOrAlias: string, lang = 'ru'): BaseCommand | null {
    let command = this.findUsingName(nameOrAlias, lang)

    if (!command) command = this.findUsingAlias(nameOrAlias, lang)

    // @ts-ignore
    if (command) return new command()
    return null
  }
}
