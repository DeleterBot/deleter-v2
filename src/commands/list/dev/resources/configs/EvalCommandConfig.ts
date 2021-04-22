import CommandTranslations from '@src/types/commands/CommandTranslations'
import FlagsDetails from '@src/types/commands/FlagsDetails'
import BaseCommandConfig from '@src/types/commands/BaseCommandConfig'
import AbstractConfig from '@src/abstractions/AbstractConfig'

export default class EvalCommandConfig extends AbstractConfig implements BaseCommandConfig {
  public name = 'eval'

  public translations: CommandTranslations = {
    ru: {
      name: 'eval',
      category: 'dev',
      aliases: [ 'e' ],
    },
    en: {
      name: 'eval',
      category: 'dev',
      aliases: [ 'e' ],
    },
    gg: {
      name: 'eval',
      category: 'dev',
      aliases: [ 'e' ],
    }
  }

  public flags: FlagsDetails = {
    'noreply': {
      name: 'noReply',
      alias: 'n'
    },
    'everywhere': {
      name: 'everywhere',
      alias: 'e'
    },
    'last': {
      name: 'last',
      alias: 'l'
    },
    'shard': {
      name: 'shard',
      type: String
    },
    'row': {
      name: 'row',
      type: Number
    },
    'api': 'api',
    'all': 'all',
    'more': 'more',
    'shell': 'shell',
    'async': 'isAsync',
    'db': 'db',
    'rows': 'rows',
  }

  public customPermissions = [ 'OWNER' ]
}
