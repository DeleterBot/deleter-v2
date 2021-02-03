class Codes {
  static ALMOST_BLOCKED = 7777

  static NEVER_AUTHORIZED = 10001
  static TOKEN_TYPE_NOT_EXISTS = 10002
  static TOKEN_INVALID = 10003
  static TOKEN_OUTDATED =10004
}

class Constants {
  static PREFIX = process.env.API_PREFIX ?? ''
  static PRIVATE = 'private/'
  static PUBLIC = 'public/'
  static OAUTH2 = 'oauth2/'

  static DISCORD_API = 'https://discord.com/api/'

  static VALID_LANGUAGES = [ 'ru', 'en', 'gg' ]

  static qiwiThemeCode = 'Dmytryi-BD7A2BZBXO'

  static hashesTable = 'hashes'
  static settingsTable = 'guilds'

  static tokenTypes = [ 'Bearer' ]

  static codes = Codes
}

export default Constants
