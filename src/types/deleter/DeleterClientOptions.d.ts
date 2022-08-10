import { ClientOptions } from 'discordoo'

export default interface DeleterClientOptions extends ClientOptions {
  owner: string
  prefix: string
  color: string
}
