import Axios, { AxiosResponse } from 'axios'
import Constants from '@api/utils/Constants'

export default function getDiscordUser(tokenType: string, token: string) {
  return Axios.get(Constants.DISCORD_API + 'users/@me', {
    headers: {
      authorization: `${tokenType} ${token}`
    }
  }).then((response: AxiosResponse) => {
    return response.data
  })
}