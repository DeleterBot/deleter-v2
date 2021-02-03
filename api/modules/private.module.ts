import { Module } from '@nestjs/common'
import PrivateStatisticsController from '@api/controllers/private/statistics.controller'
import GuildsController from '@api/controllers/private/guilds.controller'
import GuildSettingsController from '@api/controllers/private/guild-settings.controller'

@Module({
  controllers: [ PrivateStatisticsController, GuildsController, GuildSettingsController ]
})
export default class PrivateModule {}