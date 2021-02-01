import AbstractController from '@api/abstractions/abstract.controller'
import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common'
import Constants from '@api/utils/Constants'
import TokenDto from '@api/dto/token.dto'
import Axios, { AxiosResponse } from 'axios'
import generateHash from '@api/utils/generateHash'
import getDiscordUser from '@api/utils/getDiscordUser'

@Controller(Constants.PREFIX + Constants.OAUTH2)
export default class TokenController extends AbstractController {

  @Post('token')
  async execute(@Body() body: TokenDto) {

    if (!process.env.CLIENT_SECRET)
      throw new InternalServerErrorException({
        message: 'this part of oauth2 does not provided with the necessary components'
      })

    const data: Record<string, string> = {
      'grant_type': 'authorization_code',
      'client_id': body.client_id,
      'client_secret': process.env.CLIENT_SECRET,
      'redirect_uri': body.redirect_uri,
      'code': body.code,
      'scope': 'identify guilds'
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const response: AxiosResponse = await Axios.post(Constants.DISCORD_API + 'oauth2/token',
      new URLSearchParams(data),
      { headers: headers }
      ).catch(e => {
        console.error(e)
        throw new InternalServerErrorException({
          message: 'request to Discord failed'
        })
      })

    const { access_token, refresh_token, token_type, expires_in } = response.data

    const user = await getDiscordUser(token_type, access_token)

    const expires_timestamp: number = Date.now() + (expires_in * 1000)

    await this.db.update(Constants.hashesTable, user.id, {
      access_token: generateHash(access_token),
      refresh_token: generateHash(refresh_token),
      token_type: token_type,
      expires_timestamp: expires_timestamp
    }, { upsert: true })

    return {
      user_id: user.id,
      access_token: access_token,
      refresh_token: refresh_token,
      token_type: token_type
    }

  }
}