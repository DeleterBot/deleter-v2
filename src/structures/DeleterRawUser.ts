import DeleterRawUserPresence from '@src/types/deleter/DeleterRawUserPresence'
import DeleterRawUserLatestPresence from '@src/types/deleter/DeleterRawUserLatestPresence'

export default class DeleterRawUser {
  id?: string
  gender: string
  presencesEnabled: boolean
  presences: DeleterRawUserPresence[]
  latestStatusPresence?: DeleterRawUserLatestPresence
  latestGamePresence?: DeleterRawUserLatestPresence
  presencesStartedTimestamp?: Date

  constructor(data?: Record<string, any>) {

    this.id = data?.id
    this.gender = data?.gender ?? 'male'
    this.presencesEnabled = !!data?.presences_enabled
    this.presences = data?.presences ?? []
    this.latestStatusPresence = data?.latest_status_presence
    this.latestGamePresence = data?.latest_game_presence
    this.presencesStartedTimestamp = data?.presences_started

  }

}
