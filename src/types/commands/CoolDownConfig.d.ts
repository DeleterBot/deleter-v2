export default interface CoolDownConfig {
  mode: 'member' | 'channel' | 'guild'
  time: number
  stack?: number
}