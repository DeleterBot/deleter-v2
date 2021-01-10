import CommandDetails  from '@/types/commands/CommandDetails'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@/types/deleter/DeleterCustomPermissions'

export default interface CommandConfig {
  name: string,
  memberPermissions?: Discord.BitFieldResolvable<any>,
  clientPermissions?: Discord.BitFieldResolvable<any>
  customPermissions?: DeleterCustomPermissions
  ru: CommandDetails,
  en: CommandDetails,
  gg: CommandDetails
}