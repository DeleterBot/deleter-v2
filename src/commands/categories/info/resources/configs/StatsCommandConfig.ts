import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractConfig from '@src/abstractions/AbstractConfig'
import StatsCommandDto from '@src/commands/categories/info/resources/dto/StatsCommandDto'
import { PermissionFlags } from 'discordoo'

export default class StatsCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'stats'

  public translations: CommandTranslations = {
    ru: {
      name: 'стата',
      category: 'информация'
    },
    en: {
      name: 'stats',
      category: 'information'
    },
    gg: {
      name: 'хуята',
      category: 'информейшн'
    }
  }

  public dto = StatsCommandDto

  public clientPermissions = [ PermissionFlags.EMBED_LINKS ]
}
