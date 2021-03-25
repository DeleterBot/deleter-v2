import AbstractController from '@api/abstractions/abstract.controller'
import { Body, Controller, ForbiddenException, Get, Param, Patch, Req, UseGuards } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import GuildGeneralSettings from '@api/structures/GuildGeneralSettings'
import GuildPerms from '@api/utils/GuildPerms'
import AuthorizedRequest from '@api/types/AuthorizedRequest'
import GeneralSettingsDto from '@api/dto/general-settings.dto'
import SettingSavedSuccessResponse from '@api/structures/SettingSavedSuccessResponse'
import { RateLimit } from 'nestjs-rate-limiter'
import StrictAuthGuard from '@api/guards/strict-auth.guard'

@Controller(Constants.PRIVATE + 'guilds/:id/general')
export default class GuildGeneralSettingsController extends AbstractController {

  @Get()
  @UseGuards(new AuthGuard())
  @RateLimit({ keyPrefix: 'glds-stngs-get', points: 15, duration: 60 })
  async get(@Param('id') id: string, @Req() req: AuthorizedRequest) {

    const guildPerms = new GuildPerms(id, req.user.id)
    const isUserPermitted = await guildPerms.check()

    if (!isUserPermitted)
      throw new ForbiddenException({
        message: 'missing permissions'
      })

    const data = await this.db.get('guilds', id)

    return new GuildGeneralSettings(this.clientOptions!, data)

  }

  @Patch()
  @UseGuards(new StrictAuthGuard())
  @RateLimit({ keyPrefix: 'glds-stngs-save', points: 15, duration: 60 })
  async patch(
    @Param('id') id: string,
    @Req() req: AuthorizedRequest,
    @Body() body: GeneralSettingsDto
  ) {

    const guildPerms = new GuildPerms(id, req.user.id)
    const isUserPermitted = await guildPerms.check()

    if (!isUserPermitted)
      throw new ForbiddenException({
        message: 'missing permissions'
      })

    if (body.color.replace('#', '').toLowerCase() === 'ffffff')
      body.color = 'fffffa'

    if (!body.color.startsWith('#')) body.color = '#' + body.color

    return this.db.update('guilds', id, body)
      .then(() => {
        return new SettingSavedSuccessResponse()
      })

  }

}
