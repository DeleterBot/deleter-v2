import CoolDownConfig from '@src/types/commands/CoolDownConfig'
import Discord from 'discordoo'
import DeleterCustomPermissions from '@src/types/deleter/DeleterCustomPermissions'
import FlagsDetails from '@src/types/commands/FlagsDetails'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'

export default interface CommandConfig {
  name: string
  flags?: FlagsDetails
  disabled?: boolean
  cd?: CoolDownConfig
  multiLang?: boolean
  dto?: typeof AbstractCommandDto
  memberPermissions?: Discord.BitFieldResolvable<any>
  clientPermissions?: Discord.BitFieldResolvable<any>
  customPermissions?: DeleterCustomPermissions
  translations: CommandTranslations
}
