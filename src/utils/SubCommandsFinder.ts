import Discord from 'discord.js'
import BaseSubCommand from '@src/abstractions/BaseSubCommand'

const req = require

export default class SubCommandsFinder {
  public static readonly isUtils: boolean = true
  public subCommands: Discord.Collection<string, BaseSubCommand>

  constructor(commands: Discord.Collection<string, BaseSubCommand>) {
    this.subCommands = commands
  }

  findUsingName(name: string, slaveOf: string, lang = 'ru'): BaseSubCommand | null {
    const command = this.subCommands.find((c: any) => c?.[lang]?.name === name && c?.slaveOf === slaveOf)

    if (command) return req(command.path.replace(/\./g, '/'))?.default
    return null
  }

  findUsingAlias(alias: string, slaveOf: string, lang = 'ru'): BaseSubCommand | null {
    const command =
      this.subCommands.find((c: any) => c?.[lang]?.aliases?.includes(alias) && c?.slaveOf === slaveOf)

    if (command) return req(command.path.replace(/\./g, '/'))?.default
    return null
  }

  find(nameOrAlias: string, slaveOf: string, lang = 'ru'): BaseSubCommand | null {
    let command = this.findUsingName(nameOrAlias, slaveOf, lang)

    if (!command) command = this.findUsingAlias(nameOrAlias, slaveOf, lang)

    // @ts-ignore
    if (command) return new command()
    return null
  }
}