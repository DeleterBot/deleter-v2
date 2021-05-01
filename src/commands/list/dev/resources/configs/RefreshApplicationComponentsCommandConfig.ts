import CommandTranslations from '@src/types/commands/CommandTranslations'
import FlagsDetails from '@src/types/commands/FlagsDetails'
import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class RefreshApplicationComponentsCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'refresh'
  public hasSubCommands = true
  public overrideSubCommands = true

  public translations: CommandTranslations = {
    en: {
      name: 'refresh',
      category: 'dev',
      aliases: [ 'r' ]
    },
    ru: {
      name: 'refresh',
      category: 'разработка',
      aliases: [ 'r' ]
    },
    gg: {
      name: 'refresh',
      category: 'dev',
      aliases: [ 'r' ]
    }
  }

  public flags: FlagsDetails = {
    'compile': {
      name: 'compile',
      alias: 'c'
    },
    'pull': {
      name: 'pull',
      alias: 'p'
    },
    'everywhere': {
      name: 'everywhere',
      alias: 'e'
    }
  }

  public customPermissions = [ 'OWNER' ]
}
