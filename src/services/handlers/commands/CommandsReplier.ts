import { AnyWritableChannel, Message, MessageContent, MessageCreateOptions } from 'discordoo'

export default class CommandsReplier {
  static isService = true

  static processReply(to: Message, content: MessageContent, options?: MessageCreateOptions) {
    
    if (to.repliedToId) {
      
      return this.edit(to, content, options)
        .catch((e: any) => {
          if (e.message?.toLowerCase() === 'unknown message') {
            return this.send(to, content, options, true)
          }

          throw e
        })
    }

    return this.send(to, content, options, true)
  }

  static process(to: AnyWritableChannel | Message, content: MessageContent, options?: MessageCreateOptions) {
    if (to instanceof Message) {
      
      if (to.repliedToId) {
        return this.edit(to, content, options)
          .then(() => {
            // TODO when edit is implemented
          })
      }
    }

    return this.send(to, content, options)
  }

  static send(
    to: AnyWritableChannel | Message,
    content: MessageContent,
    options?: MessageCreateOptions,
    reply? :boolean
  ) {
    if (reply && to instanceof Message) {
      return to.reply(content, options)
        .then(m => {
           if (!m) return
            m.setRepliedTo(to)
            return m
        })
        .catch(() => {}) // eslint-disable-line no-empty
    } else {
      const channelId = to instanceof Message ? to.channelId : to.id

      return to.client.messages.create(channelId, content, options)
    }
  }

  static edit(to: Message, content: MessageContent, options?: MessageCreateOptions): any {
    return to.client.messages.create(to.channelId, content, options)
  }

}
