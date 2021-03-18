import AbstractController from '@api/abstractions/abstract.controller'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import IsShardsLoadedGuard from '@api/guards/is-shards-loaded.guard'
import { RateLimit } from 'nestjs-rate-limiter'

@Controller(Constants.PRIVATE + 'guilds/:id/commands')
export default class GuildCommandsSettingsController extends AbstractController {

  @Get()
  @UseGuards(new AuthGuard())
  @UseGuards(new IsShardsLoadedGuard())
  @RateLimit({ keyPrefix: 'glds-cmds-get', points: 15, duration: 60 })
  async get(@Param('id') id: string) {
    return id
  }
}
