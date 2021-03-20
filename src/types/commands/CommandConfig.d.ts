import CommandDetails  from '@src/types/commands/CommandDetails'
import CoolDownConfig from '@src/types/commands/CoolDownConfig'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@src/types/deleter/DeleterCustomPermissions'
import FlagsDetails from '@src/types/commands/FlagsDetails'

export default interface CommandConfig {
  name: string
  flags?: FlagsDetails
  disabled?: boolean
  cd?: CoolDownConfig
  multiLang?: boolean,
  memberPermissions?: Discord.BitFieldResolvable<any>
  clientPermissions?: Discord.BitFieldResolvable<any>
  customPermissions?: DeleterCustomPermissions
  ru: CommandDetails
  en: CommandDetails
  gg: CommandDetails
}
