import CoolDownConfig from '@src/types/commands/CoolDownConfig'
import Base from './Base'
import CommandConfig from '@src/types/commands/CommandConfig'
import Discord from 'discord.js'
import DeleterCustomPermissions from '@src/types/deleter/DeleterCustomPermissions'
import FlagsDetails from '@src/types/commands/FlagsDetails'
import CommandTranslations from '@src/types/commands/CommandTranslations'

export default abstract class AbstractCommand extends Base implements CommandConfig {
  public name: string
  public flags?: FlagsDetails
  public disabled?: boolean
  public cd?: CoolDownConfig
  public multiLang?: boolean

  public clientPermissions?: Discord.BitFieldResolvable<any>
  public memberPermissions?: Discord.BitFieldResolvable<any>
  public customPermissions?: DeleterCustomPermissions

  public translations: CommandTranslations

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

    this.translations = config?.translations

    Object.entries(this.translations || {}).forEach(([ key, value ]) => {
      // @ts-ignore
      if (!value.aliases) this.translations[key].aliases = []
    })
  }
}
