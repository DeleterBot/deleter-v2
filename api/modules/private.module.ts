import { Module } from '@nestjs/common'
import PrivateStatisticsController from '@api/controllers/private/statistics.controller'
import GuildsController from '@api/controllers/private/guilds.controller'
import GuildGeneralSettingsController from '@api/controllers/private/guild-general-settings.controller'
import QiwiBillingController from '@api/controllers/private/billing/qiwi-billing.controller'

@Module({
  controllers: [
    PrivateStatisticsController,
    GuildsController,
    GuildGeneralSettingsController,
    QiwiBillingController
  ]
})
export default class PrivateModule {}
