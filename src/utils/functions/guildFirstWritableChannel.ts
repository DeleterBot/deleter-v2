import Discord from 'discord.js'

export default function guildFirstWritableChannel(
  guild: Discord.Guild, useSystemChannel = true
): Discord.TextChannel | undefined {

  let channel: Discord.TextChannel

  if (guild.available) {

    guild.channels.cache.forEach((c: any) => {
      if (c.permissionsFor(guild.me!)?.has('SEND_MESSAGES')) {
        if (useSystemChannel && guild.systemChannelId === c.id) channel = c
        else if (!channel) channel = c
      }
    })

  }

  return channel!

}
