interface Details {
  name: string
  alias?: string
  multiple?: boolean
  defaultOption?: any
  type?: any
}

type FlagsDetails = Record<string, Details | string>

export default FlagsDetails
