import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import AbstractConfig from '@src/abstractions/AbstractConfig'
import { PermissionFlags } from 'discordoo'

export default class UserInfoCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'user'

  public translations: CommandTranslations = {
    ru: {
      name: 'юзер',
      category: 'информация',
      aliases: [ 'я' ]
    },
    en: {
      name: 'user',
      category: 'information',
      aliases: [ 'me' ]
    },
    gg: {
      name: 'юзер',
      category: 'информейшн',
      aliases: [ 'йа' ]
    }
  }

  public clientPermissions = [ PermissionFlags.EMBED_LINKS ]
}
