export default class Constants {
  public static readonly isUtils: boolean = true

  static get site() {
    return global.client.user!.id === '535501696454098947'
      ? 'https://deleter.xyz/'
      : global.client.user!.id === '530818177144324121'
      ? 'https://canary.deleter.xyz/'
      : 'http://localhost:8080/'
  }

  static localeLang(lang = 'ru') {
    if (lang !== 'ru' && lang !== 'en') return 'ru'
    else return lang
  }

  static supportServer = 'https://discord.gg/GYYYN65f2J'
  static docs = 'https://how.deleter.work/'
  static commandExecutionMaxTime = 15000

  static primesTable = 'primes'
  static gulagsTable = 'siberia'

}
