import { ClientEventsHandlers } from 'discordoo'

export default interface EventConfig {
  name: keyof ClientEventsHandlers
}
