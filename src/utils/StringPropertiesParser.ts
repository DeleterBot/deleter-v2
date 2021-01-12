import Base from '@/abstractions/Base'

export default class StringPropertiesParser extends Base {
  constructor() {
    super()
  }

  parseKeywords(string: string) {
    const keywordsArr = string.match(/\$keyword\[[\w.]+]/g),
      keywordsRecord: Record<string, any> = {}

    if (keywordsArr) {

    }

    return keywordsArr
  }
}