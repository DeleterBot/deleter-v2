import { AnyGuildChannel, AnyGuildWritableChannel, Guild, PermissionFlags } from 'discordoo'

export default async function guildFirstWritableChannel(
  guild: Guild, useSystemChannel = true
): Promise<AnyGuildWritableChannel | undefined> {

  let channel: AnyGuildWritableChannel | undefined

  if (!guild.unavailable) {

    if (useSystemChannel) {
      channel = await guild.systemChannel()
    }

    await guild.client.channels.cache.forEach(async (c: AnyGuildChannel) => {
      const perms = await c.memberPermissions(guild.client.user.id)
      if (perms && perms.has(PermissionFlags.SEND_MESSAGES)) {
        channel = c as AnyGuildWritableChannel
      }
    }, { storage: guild.id })

  }

  return channel

}
