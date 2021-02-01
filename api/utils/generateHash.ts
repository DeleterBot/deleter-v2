import { createHash } from 'crypto'

export default function generateHash(string: string) {
  if (!string) throw new Error('Invalid create hash parameters')

  return createHash('sha512WithRSAEncryption')
    .update(string)
    .digest('hex')
}