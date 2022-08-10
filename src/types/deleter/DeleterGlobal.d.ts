import DeleterClient from '@src/structures/DeleterClient'
import Discord, { MessageData, MessageResolvable, RawMessageData } from 'discordoo'
import DeleterApiWorker from '@api/structures/DeleterApiWorker'
import { EntityInitOptions } from 'discordoo/types/src/api/entities/EntityInitOptions'

declare global {
  namespace NodeJS {
    interface Global {
      deleter: DeleterClient
      Discord: Discord
      ApiWorker: DeleterApiWorker
    }

    interface ProcessEnv {
      TOKEN: string
      TOTAL_SHARDS: string
      CLIENT_SECRET: string | undefined

      QIWI_PRIVATE_KEY: string
      QIWI_PUBLIC_KEY: string
      QIWI_SUCCESS_URL: string

      DB_CLIENT_ID: string
      DB_CLIENT_SECRET: string
      DB_KEYSPACE: string

      REDIS_ENABLED: string
      REDIS_PORT: number
      REDIS_HOST: string

      API_PRIVSTATS_PSWD: string | undefined
      API_ENABLED: string | undefined
      API_PREFIX: string | undefined
      API_PORT: number
      API_HOST: string
    }
  }
}

declare module 'discordoo' {
  class Message {
    public repliedToId?: string

    init(
      data: (MessageData | RawMessageData) & { repliedToId?: string },
      options?: EntityInitOptions
    ): Promise<this>

    setRepliedTo(msg: MessageResolvable): this
  }
}


/*declare namespace NodeJS {
  interface Global {
    deleter: any
    Discord: any
    ApiWorker: any
  }

  interface ProcessEnv {
    TOKEN: string
    TOTAL_SHARDS: string
    CLIENT_SECRET: string | undefined

    QIWI_PRIVATE_KEY: string
    QIWI_PUBLIC_KEY: string
    QIWI_SUCCESS_URL: string

    DB_USRN: string
    DB_PSWD: string
    DB_KEYSPACE: string

    REDIS_ENABLED: string
    REDIS_PORT: number
    REDIS_HOST: string

    API_PRIVSTATS_PSWD: string | undefined
    API_ENABLED: string | undefined
    API_PREFIX: string | undefined
    API_PORT: number
    API_HOST: string
  }
}*/
