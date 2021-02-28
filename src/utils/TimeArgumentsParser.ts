import locale from '@src/utils/locale'

const matchers: Record<string, Array<RegExp>> = {
  seconds: [ /[\d]+s(ec(ond(s)?)?)?/, /[\d]+с(ек(унд(ы)?)?)?/ ],
  months: [ /[\d]+mo(nth(s)?)?/, /[\d]+ме(с(яц(а)?)?)?/ ],
  minutes: [ /[\d]+m(in(ute(s)?)?)?/, /[\d]+м(ин(ут([аы])?)?)?/ ],
  hours: [ /[\d]+h(our(s)?)?/, /[\d]+ч(ас([аов])?)?/ ],
  days: [ /[\d]+d(ay(s)?)?/, /[\d]+д(ень|ня|ней)?/ ],
  weeks: [ /[\d]+w(eek(s)?)?/, /[\d]+н(ед(ел([яьи]))?)?/ ],
  years: [ /[\d]+y(ear(s)?)?/, /[\d]+((г(од(а)?)?)|(л(ет)?))/ ],
  centuries: [ /[\d]+c(entur(y|ies))?/, /[\d]+в(ек(а|ов)?)?/ ]
}

export default class TimeArgumentsParser {
  public static readonly isUtils: boolean = true

  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
  }

  static all(string: string, lang: string): number {
    if (!string || !lang) return 0

    let result = 0
    const matchersLang: number = lang === 'en' ? 0 : 1

    result += this.centuries(string, lang)
    string = string.replace(matchers.centuries[matchersLang], '')
    result += this.years(string, lang)
    string = string.replace(matchers.years[matchersLang], '')
    result += this.months(string, lang)
    string = string.replace(matchers.months[matchersLang], '')
    result += this.weeks(string, lang)
    string = string.replace(matchers.weeks[matchersLang], '')
    result += this.days(string, lang)
    string = string.replace(matchers.days[matchersLang], '')
    result += this.hours(string, lang)
    string = string.replace(matchers.hours[matchersLang], '')
    result += this.minutes(string, lang)
    string = string.replace(matchers.minutes[matchersLang], '')
    result += this.seconds(string, lang)

    return result
  }

  static centuries(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.centuries[0] : matchers.centuries[1]
    return this.parse(string, matcher, 3153600000000, lang)
  }

  static years(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.years[0] : matchers.years[1]
    return this.parse(string, matcher, 31536000000, lang)
  }

  static months(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.months[0] : matchers.months[1]
    return this.parse(string, matcher, 2678400000, lang)
  }

  static weeks(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.weeks[0] : matchers.weeks[1]
    return this.parse(string, matcher, 604800000, lang)
  }

  static days(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.days[0] : matchers.days[1]
    return this.parse(string, matcher, 86400000, lang)
  }

  static hours(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.hours[0] : matchers.hours[1]
    return this.parse(string, matcher, 3600000, lang)
  }

  static minutes(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.minutes[0] : matchers.minutes[1]
    return this.parse(string, matcher, 60000, lang)
  }

  static seconds(string: string, lang: string): number {
    if (!string || !lang) return 0

    const matcher = lang === 'en' ? matchers.seconds[0] : matchers.seconds[1]
    return this.parse(string, matcher, 1000, lang)
  }

  static parse(string: string, matcher: RegExp, increase: number, lang: string): number {
    let result = 0,
      str = ''

    if (!string || !matcher || !increase) return result

    let testString = string.toLowerCase()

    if (lang === 'gg') lang = 'ru'
    const matchersLang: number = lang === 'en' ? 0 : 1

    for (const localMatcher in matchers) {
      if (Object.prototype.hasOwnProperty.call(matchers, localMatcher)) {
        testString = testString.replace(matchers[localMatcher][matchersLang], '')
      }
    }

    if (testString) throw new Error('the time imputed incorrectly')

    const match = string.match(matcher)
    if (!match) return result

    str = string.slice(match.index)
    str = str.slice(0, match[0].length)

    if (str.startsWith('0')) throw new Error('the time imputed incorrectly')

    const specifiedTime = Number(str.replace(/[^\d]/g, ''))
    result += specifiedTime * increase
    if (result >= Number.MAX_SAFE_INTEGER)
      throw new RangeError('the result is greater than or equal to max safe integer')

    return result
  }

  static timeToMs(string: string, lang: string): number {
    return this.all(string, lang)
  }

  static msToTime(ms: number, lang: string, extraLocale: boolean | undefined = false): string {
    if (lang === 'gg') lang = 'ru'
    if (ms >= Number.MAX_SAFE_INTEGER)
      throw new RangeError('cannot operate with number that greater than or equal to max safe integer')
    let centuries, years, months, weeks, days, hours, minutes, seconds, milliseconds

    if (ms >= 3153600000000) centuries = ~~(ms / 3153600000000)
    if (centuries) ms -= centuries * 3153600000000

    if (ms >= 31536000000) years = ~~(ms / 31536000000)
    if (years) ms -= years * 31536000000

    if (ms >= 2678400000) months = ~~(ms / 2678400000)
    if (months) ms -= months * 2678400000

    if (ms >= 604800000) weeks = ~~(ms / 604800000)
    if (weeks) ms -= weeks * 604800000

    if (ms >= 86400000) days = ~~(ms / 86400000)
    if (days) ms -= days * 86400000

    if (ms >= 3600000) hours = ~~(ms / 3600000)
    if (hours) ms -= hours * 3600000

    if (ms >= 60000) minutes = ~~(ms / 60000)
    if (minutes) ms -= minutes * 60000

    if (ms >= 1000) seconds = ~~(ms / 1000)
    if (seconds) ms -= seconds * 1000

    if (ms >= 1) milliseconds = ms

    const times: Array<Record<string, any>> = [
      { type: 'centuries', value: centuries },
      { type: 'years', value: years },
      { type: 'months', value: months },
      { type: 'weeks', value: weeks },
      { type: 'days', value: days },
      { type: 'hours', value: hours },
      { type: 'minutes', value: minutes },
      { type: 'seconds', value: seconds },
      { type: 'milliseconds', value: milliseconds }
    ]

    const timesStr: Record<string, any> = {
      centuries: {
        ru: [ 'век', 'века', 'веков' ],
        en: [ 'century', 'centuries', 'centuries' ]
      },
      years: {
        ru: [ 'год', 'года', 'лет' ],
        en: [ 'year', 'years', 'years' ]
      },
      months: {
        ru: [ 'месяц', 'месяца', 'месяцев' ],
        en: [ 'month', 'months', 'months' ]
      },
      weeks: {
        ru: [ 'неделя', 'недели', 'недель' ],
        en: [ 'week', 'weeks', 'weeks' ]
      },
      weeksExtra: {
        ru: [ 'неделю', 'недели', 'недель' ],
        en: [ 'week', 'weeks', 'weeks' ]
      },
      days: {
        ru: [ 'день', 'дня', 'дней' ],
        en: [ 'day', 'days', 'days' ]
      },
      hours: {
        ru: [ 'час', 'часа', 'часов' ],
        en: [ 'hour', 'hours', 'hours' ]
      },
      minutes: {
        ru: [ 'минута', 'минуты', 'минут' ],
        en: [ 'minute', 'minutes', 'minutes' ]
      },
      minutesExtra: {
        ru: [ 'минуту', 'минуты', 'минут' ],
        en: [ 'minute', 'minutes', 'minutes' ]
      },
      seconds: {
        ru: [ 'секунда', 'секунды', 'секунд' ],
        en: [ 'second', 'seconds', 'seconds' ]
      },
      secondsExtra: {
        ru: [ 'секунду', 'секунды', 'секунд' ],
        en: [ 'second', 'seconds', 'seconds' ]
      },
      milliseconds: {
        ru: [ 'миллисекунда', 'миллисекунды', 'миллисекунд' ],
        en: [ 'millisecond', 'milliseconds', 'milliseconds' ]
      },
      millisecondsExtra: {
        ru: [ 'миллисекунду', 'миллисекунды', 'миллисекунд' ],
        en: [ 'millisecond', 'milliseconds', 'milliseconds' ]
      }
    }

    let startOn: number, endOn: number
    times.forEach((time, i) => {
      if (time.value) {
        if (startOn === undefined)
          startOn = i
        else endOn = i
      }
    })

    let result = ''
    times.forEach((time, i) => {
      if (time.value) {
        if (extraLocale) {
          if (
            time.type === 'minutes'
            || time.type === 'weeks'
            || time.type == 'seconds'
            || time.type === 'milliseconds'
          ) time.type += 'Extra'
        }

        const comma = endOn === startOn || endOn === undefined || startOn === undefined ? ' ' : ', '

        if (endOn === i && startOn !== undefined) {
          const and = lang === 'ru' ? 'и' : 'and',
            replaceLastCommaRegExp = /,/y
          replaceLastCommaRegExp.lastIndex = result.length - 2

          if (result.endsWith(', ')) result = result.replace(replaceLastCommaRegExp, '')

          result += and + ' ' + locale(time.value, timesStr[time.type][lang])
        } else result += locale(time.value, timesStr[time.type][lang]) + comma
      }
    })

    return result.trim()
  }
}
