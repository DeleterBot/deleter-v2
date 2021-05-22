import Guild from '@src/structures/Guild'
import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'

export default interface Info<Dto = AbstractCommandDto> {
  args: Array<string>
  guild: Guild
  flags: Record<string, any>
  subCommand?: BaseSubCommand
  additionalLanguage?: string
  dto?: Dto
}
