import Discord, { StringResolvable } from 'discord.js'

export default class DeleterEmbed extends Discord.MessageEmbed {

  public amendDescription(content: StringResolvable, fromTop?: boolean) {

    if (fromTop) this.description = content += this.description
    else this.description += content

    return this
  }

}
