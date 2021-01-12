import Base from './Base'
import CommandConfig from '@/types/commands/CommandConfig'
import CommandDetails  from '@/types/commands/CommandDetails'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@/types/deleter/DeleterCustomPermissions'

export default abstract class AbstractCommand extends Base implements CommandConfig {
  public name: string
  public flags: Record<string, string> | undefined

  public clientPermissions: Discord.BitFieldResolvable<any> | undefined
  public memberPermissions: Discord.BitFieldResolvable<any> | undefined
  public customPermissions: DeleterCustomPermissions | undefined

  public ru: CommandDetails
  public en: CommandDetails
  public gg: CommandDetails

  protected constructor(config: CommandConfig) {
    super()
    this.name = config?.name
    this.flags = config?.flags

    this.clientPermissions = config?.clientPermissions
    this.memberPermissions = config?.memberPermissions
    this.customPermissions = config?.customPermissions

    this.en = config?.en
    this.ru = config?.ru
    this.gg = config?.gg
  }
}