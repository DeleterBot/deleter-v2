import AbstractCommandFlags from '@src/abstractions/AbstractCommandFlags'

export default class EvalCommandFlags implements AbstractCommandFlags {

  public static default = {
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
    'api': 'api',
    'all': 'all',
    'more': 'more',
    'shell': 'shell',
    'async': 'isAsync'
  }

}
