import AbstractController from '@api/abstractions/abstract.controller'
import { Body, Controller, ForbiddenException, Get, Param, Patch, Req, UseGuards } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import IsShardsLoadedGuard from '@api/guards/is-shards-loaded.guard'
import GuildGeneralSettings from '@api/structures/GuildGeneralSettings'
import GuildPerms from '@api/utils/GuildPerms'
import AuthorizedRequest from '@api/types/AuthorizedRequest'
import GeneralSettingsDto from '@api/dto/general-settings.dto'
import SettingSavedSuccessResponse from '@api/structures/SettingSavedSuccessResponse'

@Controller(Constants.PREFIX + Constants.PRIVATE + 'guilds/:id/')
export default class GuildSettingsController extends AbstractController {

  @Get('general')
  @UseGuards(new AuthGuard())
  @UseGuards(new IsShardsLoadedGuard())
  async getGeneralSettings(@Param('id') id: string, @Req() req: AuthorizedRequest) {

    const guildPerms = new GuildPerms(id, req.user.id)
    const isUserPermitted = await guildPerms.check()

    if (!isUserPermitted)
      throw new ForbiddenException({
        message: 'missing permissions'
      })

    const data = await this.db.get('guilds', id)

    return new GuildGeneralSettings(this.clientOptions!, data)

  }

  @Patch('general')
  @UseGuards(new AuthGuard())
  @UseGuards(new IsShardsLoadedGuard())
  async saveGeneralSettings(
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