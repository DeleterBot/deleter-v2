import Base from '@/abstractions/Base'
import Discord from 'discord.js'

const parsingRegExps: Record<string, RegExp> = {
  keys: /\$key\[[\w.]+]/g,
  keywords: /\$keyword\[[\w.]+]/g,
  phrases: /\$phrase\[[\w.]+]/g
}

export default class StringPropertiesParser extends Base {
  constructor() {
    super()
  }

  public parse(string: string, keys: Record<string, string> = {}) {
    let result: string

    result = this.circularParsing(string)
    result = this.parseKeys(result, keys)

    return result
  }

  public parseKeys(string: string, keys: Record<string, string>) {

    const match = string.match(parsingRegExps.keys)

    if (match) {
      match.forEach(m => {
        let matchID = m.slice(5)
        matchID = matchID.slice(0, matchID.length - 1)

        if (keys[matchID]) string = string.replace(m, keys[matchID])
      })
    }

    return string
  }

  private universalParse(string: string, mode: 'keywords' | 'phrases') {
    let parsingRegExp: RegExp, valuesCollection: Discord.Collection<string, string>

    switch (mode) {
      case 'keywords':
        parsingRegExp = parsingRegExps.keywords
        valuesCollection = this.client.cache.props.keywords
        break
      case 'phrases':
        parsingRegExp = parsingRegExps.phrases
        valuesCollection = this.client.cache.props.phrases
        break
    }

    const match = string.match(parsingRegExp)

    if (match) {
      match.forEach(m => {
        let matchID = m.slice(mode.length + 1)
        matchID = matchID.slice(0, matchID.length - 1)

        const matchValue = valuesCollection.get(matchID)
        if (matchValue) string = string.replace(m, matchValue)
      })
    }

    return string
  }

  public circularParsing(str: string): string {
    if (
      str.match(parsingRegExps.keywords)
      || str.match(parsingRegExps.phrases)
    ) {
      let result = ''

      result = this.universalParse(str, 'keywords')
      result = this.universalParse(result, 'phrases')

      if (result === str) return result

      return this.circularParsing(result)
    } else return str
  }
}