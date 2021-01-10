import Discord from 'discord.js'

export default class CommandsReplier {
  static isService: boolean = true

  static processReply(to: Discord.Message, content: any, options?: any) {
    // @ts-ignore
    if (to.replyedTo) {
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
      if (to.replyedTo) {
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
      // @ts-ignore
      return to.reply(content, options)
        .then(m => {
          // @ts-ignore
          to.replyedTo = m

          return m
        })
        .catch(() => {}) // eslint-disable-line no-empty
    } else {
      const channel = to instanceof Discord.Message ? to.channel : to
      // @ts-ignore
      return channel.send(content, options)
        .then(m => {
          if (to instanceof Discord.Message) {
            // @ts-ignore
            to.replyedTo = m
          }
          return m
        })
        .catch(() => {}) // eslint-disable-line no-empty
    }
  }

  static edit(to: Discord.Message, content: any, options?: any, reply?: boolean): any {

    // @ts-ignore
    const rTo: Discord.Message = to.replyedTo

    if (typeof content === 'string' && rTo.content.length && rTo.content !== rTo.author.toString() + ', ') {
      if (reply && parseInt(Discord.version.slice(0, 2)) < 13)
        content = to.author.toString() + ', ' + content
      // @ts-ignore
      return rTo.edit(content, options)
    }

    rTo.delete().catch(() => {}) // eslint-disable-line no-empty
    // @ts-ignore
    to.replyedTo = null
    return reply ? this.processReply(to, content, options) : this.process(to, content, options)
  }

}