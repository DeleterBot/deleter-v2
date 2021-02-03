export default function getShardID(guildID: string, shardsSize: number): number {
  return Number((BigInt(guildID) >> 22n) % BigInt(shardsSize))
}