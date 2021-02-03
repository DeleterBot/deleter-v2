import { Constants } from 'discord.js'

export default function makePartialGuild(guild: any, isNewGuild = false) {
  if (guild.name === null || guild.name === undefined) return {
    id: guild.id,
    name: null,
    iconURL: null,
    newGuild: true
  }

  return {
    id: guild.id,
    name: guild.name,
    iconURL: guild.icon
      ? Constants.Endpoints.CDN(Constants.DefaultOptions.http!.cdn!).Icon(guild.id, guild.icon, 'png', 64)
      : null,
    newGuild: isNewGuild
  }

}