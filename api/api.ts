/**
 * The Deleter API is a RESTful API based on HTTP(s) requests and JSON responses.
 *
 * @author Mirdukkk
 */

import DeleterApiWorker from '@api/structures/DeleterApiWorker'
import Discord from 'discord.js'
import FastifyCors from 'fastify-cors'

export default function api(manager: Discord.ShardingManager) {

  const api = new DeleterApiWorker(manager, process.env.API_PORT, process.env.API_HOST)

  return api.start(
    undefined,
    [ FastifyCors, { origin: true } ]
  )

}
