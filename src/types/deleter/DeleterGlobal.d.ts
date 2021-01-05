declare module NodeJS {
  interface Global {
    client: any
    Discord: any
  }

  interface ProcessEnv {
    TOKEN: string,
    TOTAL_SHARDS: string,
    DB_USRN: string,
    DB_PSWD: string,
    DB_KEYSPACE: string,
    REDIS_PORT: number,
    REDIS_HOST: string
  }
}