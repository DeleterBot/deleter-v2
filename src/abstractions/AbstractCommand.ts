import CoolDownConfig from '@src/types/commands/CoolDownConfig'
import Base from './Base'
import CommandConfig from '@src/types/commands/CommandConfig'
import CommandDetails  from '@src/types/commands/CommandDetails'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@src/types/deleter/DeleterCustomPermissions'
import FlagsDetails from '@src/types/commands/FlagsDetails'

export default abstract class AbstractCommand extends Base implements CommandConfig {
  public name: string
  public flags?: FlagsDetails
  public disabled?: boolean
  public cd?: CoolDownConfig
  public multiLang?: boolean

  public clientPermissions?: Discord.BitFieldResolvable<any>
  public memberPermissions?: Discord.BitFieldResolvable<any>
  public customPermissions?: DeleterCustomPermissions

  public ru: CommandDetails
  public en: CommandDetails
  public gg: CommandDetails

  protected constructor(config: CommandConfig) {
    super()
    this.name = config?.name
    this.flags = config?.flags
    this.disabled = config?.disabled
    this.cd = config?.cd
    this.multiLang = config?.multiLang

    this.clientPermissions = config?.clientPermissions
    this.memberPermissions = config?.memberPermissions
    this.customPermissions = config?.customPermissions

    this.en = config?.en
    this.ru = config?.ru
    this.gg = config?.gg

    if (this.en && !this.en.aliases) this.en.aliases = []
    if (this.ru && !this.ru.aliases) this.ru.aliases = []
    if (this.gg && !this.gg.aliases) this.gg.aliases = []
  }
}
