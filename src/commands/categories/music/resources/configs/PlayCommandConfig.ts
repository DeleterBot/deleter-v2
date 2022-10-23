import AbstractConfig from '@src/abstractions/AbstractConfig'
import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import CommandTranslations from '@src/types/commands/CommandTranslations'
import { PermissionFlags } from 'discordoo'

export default class PlayCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'play'

  public translations: CommandTranslations = {
    ru: {
      name: 'плей',
      category: 'музыка'
    },
    en: {
      name: 'play',
      category: 'music'
    },
    gg: {
      name: 'брынькай',
      category: 'музло',
      aliases: [ 'брынькай', 'брынькаймузло', 'плей' ]
    }
  }

  public clientPermissions = [ PermissionFlags.EMBED_LINKS, PermissionFlags.ADD_REACTIONS ]
}