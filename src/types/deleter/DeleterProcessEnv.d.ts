export default interface DeleterProcessEnv extends NodeJS.ProcessEnv {
  TOKEN: string,
  TOTAL_SHARDS: string,
  DB_USRN: string,
  DB_PSWD: string
}