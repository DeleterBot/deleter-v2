interface Details {
  name: string
  alias?: string
  multiple?: boolean
  defaultOption?: any
  type?: any
  description?: string
}

type FlagsDetails = Record<string, Details | string>

export default FlagsDetails
