import {
  attach,
  Json,
  Message,
  MessageData,
  MessageResolvable,
  RawMessageData,
  resolveMessageId,
  ToJsonProperties
} from 'discordoo'
import { EntityInitOptions } from 'discordoo/types/src/api/entities/EntityInitOptions' // TODO

export class ExtendedMessage extends Message {
  public declare repliedToId?: string

  async init(
    data: (MessageData | RawMessageData) & { repliedToId?: string },
    options?: EntityInitOptions
  ): Promise<this> {
    await super.init(data, options)

    attach(this, data, {
      props: [ 'repliedToId' ],
    })

    return this
  }

  setRepliedTo(msg: MessageResolvable): this {
    const id = resolveMessageId(msg)
    if (!id) throw new Error('Invalid message')
    this.repliedToId = id
    return this
  }

  toJson(properties?: ToJsonProperties, obj?: any): Json {
    return super.toJson({
      ...properties,
      repliedToId: true,
    }, obj)
  }
}