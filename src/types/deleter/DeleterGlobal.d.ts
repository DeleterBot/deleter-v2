declare namespace NodeJS {
  interface Global {
    client: any
    Discord: any,
    ApiWorker: any
  }

  interface ProcessEnv {
    TOKEN: string,
    TOTAL_SHARDS: string,

    DB_USRN: string,
    DB_PSWD: string,
    DB_KEYSPACE: string,

    CACHE_ENABLED: string | undefined,
    REDIS_PORT: number,
    REDIS_HOST: string,

    API_ENABLED: string | undefined
    API_PORT: number,
    API_HOST: string,
  }
}