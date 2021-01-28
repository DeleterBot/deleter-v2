import Discord from 'discord.js'

export default abstract class AbstractController {
  manager: Discord.ShardingManager

  public constructor() {
    this.manager = global.ApiWorker.manager
  }
}