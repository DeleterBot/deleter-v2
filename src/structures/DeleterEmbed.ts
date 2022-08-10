import { MessageEmbed, MessageEmbedConstructor, MessageEmbedData, RawMessageEmbedData } from 'discordoo'

export default class DeleterEmbed extends MessageEmbedConstructor {

  constructor(data?: MessageEmbedData | RawMessageEmbedData | MessageEmbed) {
    super(data ?? {})
  }

  public amendDescription(content: string, fromTop?: boolean) {

    if (fromTop) this.description = content += this.description
    else this.description += content

    return this
  }

}
