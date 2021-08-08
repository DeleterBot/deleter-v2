import Discord from 'discord.js'

export default class DeleterEmbed extends Discord.MessageEmbed {

  public amendDescription(content: string, fromTop?: boolean) {

    if (fromTop) this.description = content += this.description
    else this.description += content

    return this
  }

}
