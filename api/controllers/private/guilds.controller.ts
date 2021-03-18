import AbstractController from '@api/abstractions/abstract.controller'
import { Controller, ForbiddenException, Get, NotFoundException, Param, Req, UseGuards } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import AuthGuard from '@api/guards/auth.guard'
import AuthorizedRequest from '@api/types/AuthorizedRequest'
import IsShardsLoadedGuard from '@api/guards/is-shards-loaded.guard'
import Axios from 'axios'
import { BitField } from 'discord.js'
import makePartialGuild from '@api/utils/makePartialGuild'
import getShardID from '@api/utils/getShardID'
import GuildPerms from '@api/utils/GuildPerms'
import makeGuild from '@api/utils/makeGuild'
import { RateLimit } from 'nestjs-rate-limiter'

@Controller(Constants.PRIVATE + 'guilds/')
export default class GuildsController extends AbstractController {

  @Get()
  @UseGuards(new AuthGuard())
  @UseGuards(new IsShardsLoadedGuard())
  @RateLimit({ keyPrefix: 'glds-list', points: 5, duration: 60 })
  async execute(@Req() req: AuthorizedRequest) {

    const guilds = await Axios.get(
      Constants.DISCORD_API + 'users/@me/guilds',
      { headers: { authorization: `${req.user.tokenType} ${req.user.token}` } }
      )
      .then(async response => {

        const result: any[] = []

        for await (const guild of response.data) {
          // fix when /api/v8
          const permissions = new BitField(guild.permissions)
          if (permissions?.has?.(8) || guild.owner) {

            const shardID = getShardID(guild.id, this.manager.shards.size)

            await this.manager.shards.get(shardID)?.eval(`this.guilds.cache.get('${guild.id}')`)
              .then(res => {
                const guild = makePartialGuild(res, !!res)
                if (guild) result.push(guild)
              }).catch(() => {})

          }
        }

        return result.sort(g => {
          if (g.newGuild) return -1
          else return 1
        })

      })
      .catch(e => {
        console.error(e)
        return null
      })

    if (!Array.isArray(guilds)) return []

    return guilds

  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  @UseGuards(new IsShardsLoadedGuard())
  @RateLimit({ keyPrefix: 'glds-id', points: 15, duration: 60 })
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
