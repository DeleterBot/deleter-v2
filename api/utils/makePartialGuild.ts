import { makeImageUrl } from 'discordoo'

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
      ? 'https://cdn.discordapp.com/' + makeImageUrl(guild.icon, 'png', { size: 128 })
      : null,
    added: added
  }

}
