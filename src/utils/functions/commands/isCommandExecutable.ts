import DeleterClient from '@src/structures/DeleterClient'
import BaseCommand from '@src/abstractions/BaseCommand'
import Guild from '@src/structures/Guild'
import {
  AnyGuildWritableChannel,
  DirectMessagesChannel,
  Message,
} from 'discordoo'

export default async function isCommandExecutable(
  deleter: DeleterClient,
  command: BaseCommand,
  guild: Guild,
  msg: Message
): Promise<({ executable: boolean, why?: any, missing?: string[] })> {

  if (command.disabled) return {
    executable: false
  }

  if (command.customPermissions) {
    if (command.customPermissions.includes('OWNER')) {
      if (!deleter.owner?.includes(msg.authorId)) return {
        executable: false,
        why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingPermissions]`,
        missing: [ 'OWNER' ]
      }
    }
  }

  return {
    executable: true
  }

  // TODO
  /*const channel: Exclude<AnyGuildWritableChannel, DirectMessagesChannel> | undefined = await msg.channel() as any
  if (!channel) return {
    executable: false,
    why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingCache]`,
  }


  if (command.memberPermissions) {
    const perms = await channel.memberPermissions(msg.authorId)

    if (!perms) {
      return {
        executable: false,
        why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingCache]`,
      }
    }

    const isPermitted = perms.has(command.memberPermissions)
    if (!isPermitted) return {
      executable: false,
      why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingPermissions]`,
    }
  }

  if (command.clientPermissions) {
    const perms = await channel.memberPermissions(msg.client.user.id)

    if (!perms) {
      return {
        executable: false,
        why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingCache]`,
      }
    }

    console.log('client perms', perms, command.clientPermissions, perms.has(command.clientPermissions))

    const isPermitted = perms.has(command.clientPermissions)
    if (!isPermitted) return {
      executable: false,
      why: `$phrase[${guild.lang.interface}.deleter.global.errors.clientMissingPermissions]`,
    }
  }

  return {
    executable: true
  }*/
}
