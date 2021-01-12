import Discord from 'discord.js'
import BaseCommand from '@/abstractions/BaseCommand'

export default class CommandsFinder {
  public commands: Discord.Collection<string, BaseCommand>

  constructor(commands: Discord.Collection<string, BaseCommand>) {
    this.commands = commands
  }

  findUsingName(name: string, lang: string = 'ru'): BaseCommand | null {
    const command = this.commands.find((c: any) => c?.[lang]?.name === name)

    if (command) return require(command.path.replace(/\./g, '/'))?.default
    return null
  }

  findUsingAlias(alias: string, lang: string = 'ru'): BaseCommand | null {
    const command = this.commands.find((c: any) => c?.[lang]?.aliases?.includes(alias))

    if (command) return require(command.path.replace(/\./g, '/'))?.default
    return null
  }

  find(nameOrAlias: string, lang: string = 'ru'): BaseCommand | null {
    let command = this.findUsingName(nameOrAlias, lang)

    if (!command) command = this.findUsingAlias(nameOrAlias, lang)

    // @ts-ignore
    if (command) return new command()
    return null
  }
}