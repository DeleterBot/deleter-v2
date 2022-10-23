import { Client } from 'discordoo'
import { NodeOption, Connector } from 'shoukaku'

export default class ShoukakuDiscordooConnector extends Connector {
  declare client: Client

  getId(): string {
    return this.client.user.id
  }

  listen(nodes: NodeOption[]): void {
    this.client.once('ready', () => this.ready(nodes))
    this.client.on('raw', (packet: any) => this.raw(packet))
  }

  sendPacket(shardId: number, payload: any, important: boolean): void {
    this.client.gateway.send(payload, { shards: [ shardId ], important })
  }

}