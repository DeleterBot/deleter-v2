import Discord from 'discord.js'

// TODO: delete this shit and rewrite using ExtendedMessage

export default class CommandsReplier {
  static isService = true

  static processReply(to: Discord.Message, content: any, options?: any) {
    // @ts-ignore
    if (to.repliedTo) {
      // @ts-ignore
      return this.edit(to, content, options, to)
        .catch((e: any) => {
          if (e.message?.toLowerCase() === 'unknown message') {
            return this.send(to, content, options, true)
          }

          throw e
        })
    }

    return this.send(to, content, options, true)
  }

  static process(to: Discord.TextChannel | Discord.Message, content: any, options?: any) {
    if (to instanceof Discord.Message) {
      // @ts-ignore
      if (to.repliedTo) {
        // @ts-ignore
        return this.edit(to, content, options)
          .catch((e: any) => {
            if (e.message?.toLowerCase() === 'unknown message') {
              return this.send(to, content, options)
            }

            throw e
          })
      }
    }

    return this.send(to, content, options)
  }

  static send(
    to: Discord.TextChannel | Discord.Message,
    content: any,
    options?: any,
    reply? :boolean
  ) {
    if (reply && to instanceof Discord.Message) {
      const res =
        content instanceof Discord.MessageEmbed ? { embeds: [ content ], ...options } : { content, ...options }
      // @ts-ignore
      return to.reply(res)
        .then(m => {
          // @ts-ignore
          to.repliedTo = m

          return m
        })
        .catch(() => {}) // eslint-disable-line no-empty
    } else {
      const channel = to instanceof Discord.Message ? to.channel : to
      const res =
        content instanceof Discord.MessageEmbed ? { embeds: [ content ], ...options } : { content, ...options }
      // @ts-ignore
      return channel.send(res)
        .then(m => {
          if (to instanceof Discord.Message) {
            // @ts-ignore
            to.repliedTo = m
          }
          return m
        })
        .catch(() => {}) // eslint-disable-line no-empty
    }
  }

  static edit(to: Discord.Message, content: any, options?: any, reply?: boolean): any {

    // @ts-ignore
    const rTo: Discord.Message = to.repliedTo

    if (typeof content === 'string' && rTo.content.length && rTo.content !== rTo.author.toString() + ', ') {
      if (reply && parseInt(Discord.version.slice(0, 2)) < 13)
        content = to.author.toString() + ', ' + content
      const res =
        content instanceof Discord.MessageEmbed ? { embeds: [ content ], ...options } : { content, ...options }
      // @ts-ignore
      return rTo.edit(res)
    }

    rTo.delete().catch(() => {}) // eslint-disable-line no-empty
    // @ts-ignore
    to.repliedTo = null
    return reply ? this.processReply(to, content, options) : this.process(to, content, options)
  }

}
