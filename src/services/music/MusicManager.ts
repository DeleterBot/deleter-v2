import { MusicDispatcher } from '@src/services/music/MusicDispatcher'
import DeleterClient from '@src/structures/DeleterClient'
import { ChannelResolvable, Collection, GuildResolvable, resolveChannelId, resolveGuildId } from 'discordoo'
import { NodeOption, Shoukaku, ShoukakuOptions, Track } from 'shoukaku'
import ShoukakuDiscordooConnector from '@src/structures/ShoukakuDiscordooConnector'
import getShardID from '@api/utils/getShardID'

export interface DispatcherAmongQueue {
  dispatcher: MusicDispatcher
  queue: Track[]
}

export enum MusicManagerPlayErrors {
  NoNodes,
  CantJoinChannel,
  NoTracks,
  LoadFailed,
  SearchFailed,
}

export class MusicManager extends Shoukaku {
  public dispatchers = new Collection<string, DispatcherAmongQueue>()
  public client: DeleterClient

  constructor(client: DeleterClient, nodes: NodeOption[], options: ShoukakuOptions) {
    super(new ShoukakuDiscordooConnector(client), nodes, options)
    this.client = client
  }

  async play(
    guild: GuildResolvable, text: ChannelResolvable, voice: ChannelResolvable, requested: string
  ): Promise<DispatcherAmongQueue> {
    const guildId = resolveGuildId(guild)!,
      writableChannelId = resolveChannelId(text)!,
      playingChannelId = resolveChannelId(voice)!,
      node = this.getNode()

    if (!node) throw new MusicManagerError(MusicManagerPlayErrors.NoNodes)

    let dispatcher = this.dispatchers.get(playingChannelId)
    if (!dispatcher) {
      const player = await node.joinChannel({
        guildId,
        channelId: playingChannelId,
        shardId: getShardID(guildId, this.client.sharding.totalShards),
        deaf: true,
      }).catch(() => { throw new MusicManagerError(MusicManagerPlayErrors.CantJoinChannel) })

      dispatcher = {
        dispatcher: new MusicDispatcher(this.client, player, { guildId, playingChannelId, writableChannelId }),
        queue: []
      }
      this.dispatchers.set(playingChannelId, dispatcher)
    }

    const track = await node.rest.resolve(requested)
    if (!track) throw new MusicManagerError(MusicManagerPlayErrors.SearchFailed)
    switch (track.loadType) {
      case 'NO_MATCHES':
        throw new MusicManagerError(MusicManagerPlayErrors.NoTracks)
      case 'LOAD_FAILED':
        throw new MusicManagerError(MusicManagerPlayErrors.LoadFailed)
      case 'TRACK_LOADED':
        dispatcher.queue.push(track.tracks[0])
        break
      case 'PLAYLIST_LOADED':
        dispatcher.queue.push(...track.tracks)
        break
      case 'SEARCH_RESULT':
        dispatcher.queue.push(track.tracks[0])
        break
    }

    await dispatcher.dispatcher.play(dispatcher.queue.shift()!)

    return dispatcher
  }
}

export class MusicManagerError extends Error {
  constructor(public code: MusicManagerPlayErrors) {
    super('MusicManagerError')
  }
}