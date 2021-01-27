import CommandDetails  from '@/types/commands/CommandDetails'
import CoolDownConfig from '@/types/commands/CoolDownConfig'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@/types/deleter/DeleterCustomPermissions'

export default interface CommandConfig {
  name: string
  flags?: Record<string, any>
  disabled?: boolean
  cd?: CoolDownConfig
  memberPermissions?: Discord.BitFieldResolvable<any>
  clientPermissions?: Discord.BitFieldResolvable<any>
  customPermissions?: DeleterCustomPermissions
  ru: CommandDetails
  en: CommandDetails
  gg: CommandDetails
}