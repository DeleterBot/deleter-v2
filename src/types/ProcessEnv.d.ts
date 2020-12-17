export default interface ProcessEnv extends NodeJS.Process {
  TOKEN: string,
  TOTAL_SHARDS: number | undefined
}