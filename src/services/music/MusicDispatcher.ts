import DeleterClient from '@src/structures/DeleterClient'
import { Player, Track, TrackEndReason } from 'shoukaku'
import { TypedEmitter } from 'tiny-typed-emitter'

export interface MusicDispatcherOptions {
  writableChannelId: string
  playingChannelId: string
  guildId: string
}

export interface MusicDispatcherEvents {
  start: (track: Track) => void
  finish: (track: Track) => void
  stop: (track: Track) => void
  stuck: (track: Track) => void
  error: (track: Track, error: Error) => void
}

export class MusicDispatcher extends TypedEmitter {
  public playing?: Track

  constructor(
    public client: DeleterClient,
    public player: Player,
    public options: MusicDispatcherOptions
  ) {
    super()
    this.player.on('start', () => this.emit('start', this.playing))
    this.player.on('end', e => this._handleClose(e.reason))
    this.player.on('stuck', () => this._handleClose('STUCK'))
    this.player.on('exception', () => this._handleClose('ERROR'))
  }

  async play(track: Track) {
    this.playing = track
    await this.player.playTrack(track)
  }

  async stop() {
    await this.player.stopTrack()
  }

  private _handleClose(reason: TrackEndReason | 'ERROR' | 'STUCK') {
    switch (reason) {
      case 'REPLACED':
        console.log('REPLACED', this.options)
        break
      case 'STOPPED':
        this.emit('stop', this.playing)
        this.playing = undefined
        break
      case 'LOAD_FAILED':
      case 'ERROR':
      case 'STUCK':
        this.emit('error', this.playing)
        this.playing = undefined
        break
      case 'FINISHED':
        this.emit('finish', this.playing)
        this.playing = undefined
        break
      case 'CLEANUP':
        console.log('CLEANUP', this.options)
        break
    }
  }
}