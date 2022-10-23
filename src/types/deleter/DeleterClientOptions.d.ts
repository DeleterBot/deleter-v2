import { ClientOptions } from 'discordoo'
import { NodeOption } from 'shoukaku'

export default interface DeleterClientOptions extends ClientOptions {
  owner: string
  prefix: string
  color: string
  nodes?: NodeOption[]
}
