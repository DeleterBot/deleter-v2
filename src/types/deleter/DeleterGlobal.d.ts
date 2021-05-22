import DeleterClient from '@src/structures/DeleterClient'
import Discord from 'discord.js'
import DeleterApiWorker from '@api/structures/DeleterApiWorker'

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
