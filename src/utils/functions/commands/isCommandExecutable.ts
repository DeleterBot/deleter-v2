import DeleterClient from '@src/structures/DeleterClient'
import BaseCommand from '@src/abstractions/BaseCommand'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Guild from '@src/structures/Guild'

export default function isCommandExecutable(
  deleter: DeleterClient,
  command: BaseCommand,
  guild: Guild,
  msg: DeleterCommandMessage
): ({ executable: boolean, why?: any, missing?: string[] }) {

  if (command.disabled) return {
    executable: false
  }

  if (command.customPermissions) {
    if (command.customPermissions.includes('OWNER')) {
      if (!deleter.owner?.includes(msg.author.id)) return {
        executable: false,
        why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingPermissions]`,
        missing: [ 'OWNER' ]
      }
    }
  }

  if (command.memberPermissions) {
    const isPermitted = msg.channel.permissionsFor(msg.author)?.has(command.memberPermissions)
    if (!isPermitted) return {
      executable: false,
      why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingPermissions]`,
    }
  }

  if (command.clientPermissions) {
    const isPermitted = msg.channel.permissionsFor(msg.guild.me!)?.has(command.clientPermissions)
    if (!isPermitted) return {
      executable: false,
      why: `$phrase[${guild.lang.interface}.deleter.global.errors.missingClientPermissions]`,
    }
  }

  return {
    executable: true
  }

}
