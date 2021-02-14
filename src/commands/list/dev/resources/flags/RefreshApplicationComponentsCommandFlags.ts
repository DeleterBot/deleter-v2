import AbstractCommandFlags from '@src/abstractions/AbstractCommandFlags'

export default class RefreshApplicationComponentsCommandFlags implements AbstractCommandFlags {

  public static default = {
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

}
