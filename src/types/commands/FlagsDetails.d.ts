interface Details {
  name: string
  alias?: string
  multiple?: boolean
  defaultOption?: any
  // eslint-disable-next-line
  type?: String | Boolean | Number
}

type FlagsDetails = Record<string, Details | string>

export default FlagsDetails
