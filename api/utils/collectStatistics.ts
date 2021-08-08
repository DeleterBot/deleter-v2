import Discord from 'discord.js'

const cache: Record<string, any> = {}

async function collectStatistics(manager: Discord.ShardingManager) {

  let needToCreateCache = false

  if (cache.expiresTimestamp > Date.now())
    return Object.assign({}, { shards: cache.stats.shards }, cache.stats.statistic)
  else needToCreateCache = true

  const shards = [],
    script =
      '[ deleter.ws.status, deleter.ws.ping,'
      + ' deleter.channels.cache.size, deleter.guilds.cache.size,'
      + ' deleter.users.cache.size, deleter.ws.destroyed, deleter.ws.reconnecting ]'

  const statistic = {
    totalGuilds: 0,
    totalChannels: 0,
    totalUsers: 0,
  }

  for await (const shard of Array.from(manager.shards.values())) {
    global.ApiWorker.logger.log('debug', 'predata!!')
    const data = await shard.eval<any>(() => [ undefined, -1, 0, 0, 0, true, true ])

    global.ApiWorker.logger.log('debug', 'data!!', data)

    statistic.totalUsers += data[4] ?? 0
    statistic.totalGuilds += data[3] ?? 0
    statistic.totalChannels += data[2] ?? 0

    shards.push({
      id: shard.id + 1,
      ready: (data[5] || data[6]) ? false : !data[0],
      status: data[0] ?? 1,
      ping: data[1] < 1 ? 1 : data[1] ?? 1,
      channels: data[2] ?? 0,
      guilds: data[3] ?? 0,
      users: data[4] ?? 0
    })

  }

  if (needToCreateCache) {
    cache.stats = { shards: shards, statistic: statistic }
    cache.expiresTimestamp = Date.now() + 15 * 1000
  }

  return Object.assign({}, { shards }, statistic)
}

export default collectStatistics
