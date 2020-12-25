export default interface DeleterProcessEnv extends NodeJS.ProcessEnv {
  TOKEN: string,
  TOTAL_SHARDS: string,
  DB_CONNECTION_POINT: string
}