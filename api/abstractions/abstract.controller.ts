import { NestFastifyApplication } from '@nestjs/platform-fastify'
import Discord from 'discord.js'

export default abstract class AbstractController {
  api: NestFastifyApplication
  manager: Discord.ShardingManager

  protected constructor() {
    this.api = global.ApiWorker.api
    this.manager = global.ApiWorker.manager
  }
}