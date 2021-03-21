import CoolDownConfig from '@src/types/commands/CoolDownConfig'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@src/types/deleter/DeleterCustomPermissions'
import FlagsDetails from '@src/types/commands/FlagsDetails'
import CommandTranslations from '@src/types/commands/CommandTranslations'

export default interface CommandConfig {
  name: string
  flags?: FlagsDetails
  disabled?: boolean
  cd?: CoolDownConfig
  multiLang?: boolean
  memberPermissions?: Discord.BitFieldResolvable<any>
  clientPermissions?: Discord.BitFieldResolvable<any>
  customPermissions?: DeleterCustomPermissions
  translations: CommandTranslations
}
