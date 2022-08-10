import AbstractController from '@api/abstractions/abstract.controller'
import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Req,
  UseGuards
} from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import AuthorizedRequest from '@api/types/AuthorizedRequest'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { BitField, ReadonlyPermissions } from 'discordoo'
import makePartialGuild from '@api/utils/makePartialGuild'
import getShardID from '@api/utils/getShardID'
import GuildPerms from '@api/utils/GuildPerms'
import makeGuild from '@api/utils/makeGuild'
import { Throttle } from '@nestjs/throttler'

@Controller(Constants.PRIVATE + 'guilds/')
@UseGuards(new AuthGuard())
export default class GuildsController extends AbstractController {

  @Get()
  @Throttle(5, 60)
  async execute(@Req() req: AuthorizedRequest) {

    const response: AxiosResponse & AxiosError = await Axios.get(
      Constants.DISCORD_API + 'users/@me/guilds',
      { headers: { authorization: `${req.user.tokenType} ${req.user.token}` } }
    ).catch(e => e)

    if (response.isAxiosError) {
      if (response?.response?.status === 401) {
        throw new ForbiddenException({
          message: 'cannot perform guilds examination, got 401',
          code: 0
        })
      } else {
        throw new HttpException({
          message: 'request to Discord failed',
          code: 0
        }, response.response?.status || 500)
      }
    }

    const result: any[] = []

    for await (const guild of response.data) {

      const perms = new ReadonlyPermissions(guild.permissions || 0)

      if (perms.has(8) || guild.owner) {
        const shardID = getShardID(guild.id, this.manager.shards.size)
        const shard = this.manager.shards.get(shardID)

        if (!shard) {
          result.push(makePartialGuild(guild))
        } else {
          const exists: boolean = await shard.eval(c => c.guilds.cache.has(guild.id))
            .then(r => !!r)
            .catch(() => false)

          result.push(makePartialGuild(guild, exists))
        }
      }

    }

    return result.sort(g => {
      if (!g.added) return 1
      else return -1
    })

  }

  @Get(':id')
  @Throttle(15, 60)
  async get(@Param('id') id: string, @Req() req: AuthorizedRequest) {

    const shardID = getShardID(id, this.manager.shards.size)

    const guildPerms = new GuildPerms(id, req.user.id)
    const isUserPermitted = await guildPerms.check()

    if (!isUserPermitted)
      throw new ForbiddenException({
        message: 'missing permissions'
      })

    const script = makeGuild(id)

    const guild = await this.manager.shards.get(shardID)?.eval(script)

    if (!guild)
      throw new NotFoundException({
        message: 'this guild does not exist or unavailable'
      })

    return guild

  }

}
