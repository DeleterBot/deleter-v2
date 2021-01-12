export default interface CommandDetails {
  name: string,
  aliases?: Array<string>
  description?: string
  flags?: Record<string, string>
}