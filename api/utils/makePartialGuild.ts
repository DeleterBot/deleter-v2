import { Constants } from 'discord.js'

export default function makePartialGuild(guild: any, added = false) {
  if (guild.name === null || guild.name === undefined) return {
    id: guild.id,
    name: null,
    icon: null,
    added: false
  }

  return {
    id: guild.id,
    name: guild.name,
    icon: guild.icon
      ? Constants.Endpoints.CDN(Constants.DefaultOptions.http!.cdn!).Icon(guild.id, guild.icon, 'png', 64)
      : null,
    added: added
  }

}
