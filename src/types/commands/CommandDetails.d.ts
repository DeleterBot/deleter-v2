import FlagsDetails from '@src/types/commands/FlagsDetails'

export default interface CommandDetails {
  name: string,
  aliases?: Array<string>
  description?: string
  flags?: FlagsDetails
  category?: string
}
