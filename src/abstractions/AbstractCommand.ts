import CoolDownConfig from '@src/types/commands/CoolDownConfig'
import CommandConfig from '@src/types/commands/CommandConfig'
import { BigBitFieldResolvable } from 'discordoo'
import DeleterCustomPermissions from '@src/types/deleter/DeleterCustomPermissions'
import FlagsDetails from '@src/types/commands/FlagsDetails'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'
import Base from '@src/abstractions/Base'

export default abstract class AbstractCommand extends Base implements CommandConfig {
  public name: string
  public flags?: FlagsDetails
  public disabled?: boolean
  public cd?: CoolDownConfig
  public multiLang?: boolean
  public dto?: typeof AbstractCommandDto

  public clientPermissions?: BigBitFieldResolvable
  public memberPermissions?: BigBitFieldResolvable
  public customPermissions?: DeleterCustomPermissions

  public translations: CommandTranslations

  protected constructor(config: CommandConfig) {
    super()
    this.name = config?.name
    this.flags = config?.flags
    this.disabled = config?.disabled
    this.cd = config?.cd
    this.multiLang = config?.multiLang
    this.dto = config?.dto

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
