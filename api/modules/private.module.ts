import { Module } from '@nestjs/common'
import PrivateStatisticsController from '@api/controllers/private/statistics.controller'
import GuildsController from '@api/controllers/private/guilds.controller'
import GuildGeneralSettingsController from '@api/controllers/private/guild-general-settings.controller'

@Module({
  controllers: [ PrivateStatisticsController, GuildsController, GuildGeneralSettingsController ]
})
export default class PrivateModule {}