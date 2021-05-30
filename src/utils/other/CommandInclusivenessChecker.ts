import DeleterGuild from '@src/structures/djs/DeleterGuild'
import WhereCommandMayBeDisabled from '@src/types/WhereCommandMayBeDisabled'
import Base from '@src/abstractions/Base'

export default class CommandInclusivenessChecker extends Base {
  public static readonly isUtils = true
  private guild: DeleterGuild

  constructor(guild: DeleterGuild) {
    super()
    this.guild = guild
  }

  async disabled(where: WhereCommandMayBeDisabled, command: string) {

    return 'nigde nah'

  }
}
