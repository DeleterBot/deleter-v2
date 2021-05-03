export default class Constants {
  public static readonly isUtils: boolean = true

  static get site() {
    return global.deleter.user!.id === '535501696454098947'
      ? 'https://deleter.xyz/'
      : global.deleter.user!.id === '530818177144324121'
      ? 'https://canary.deleter.xyz/'
      : 'http://localhost:8080/'
  }

  static localeLang(lang = 'ru') {
    if (lang !== 'ru' && lang !== 'en') return 'ru'
    else return lang
  }

  static getMomentFormat(mode: 'time' | 'calendar' = 'calendar', lang = 'ru'): string {
    switch (mode) {
      case 'calendar':
        if (lang === 'en') return 'L'
        else return 'DD.MM.YYYY'

      case 'time':
        if (lang === 'en') return 'll LTS'
        else return 'D MMM YYYY, в kk:mm:ss'

      default:
        return 'D MMM YYYY, в kk:mm:ss'
    }
  }

  static supportServer = 'https://discord.gg/GYYYN65f2J'
  static docs = 'https://how.deleter.work/'
  static commandExecutionMaxTime = 15000
  static nobody = 'nobody#0000'

  static successEmoji = '😎'
  static failEmoji = '👺'

  static primesTable = 'primes'
  static gulagsTable = 'siberia'
  static usersTable = 'users'

  static CASSANDRA_READ_TIMEOUT = 60000

}
