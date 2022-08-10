/**
* @note this part of the project code was taken from the open source library "discordoo" and has been modified.
* @see https://github.com/discordjs/discordoo
* */


// Deleter epoch (2018-01-01T00:00:00.000Z)
const EPOCH = 1514764800000
let INCREMENT = 0

export default class Snowflake {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`)
  }

  /**
   * A Twitter snowflake, except the epoch is 2018-01-01T00:00:00.000Z
   * ```
   * If we have a snowflake '266241948824764416' we can represent it as binary:
   *
   * 64                                          22     17     12          0
   *  000000111011000111100001101001000101000000  00001  00000  000000000000
   *       number of ms since Deleter epoch       worker  pid    increment
   * ```
   * @typedef {string} Snowflake
   */

  static generate(timestamp: number | Date = Date.now()) {
    if (timestamp instanceof Date) timestamp = timestamp.getTime()

    if (INCREMENT >= 4095) INCREMENT = 0

    // eslint-disable-next-line max-len
    const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, '0')}0000100000${(INCREMENT++)
      .toString(2)
      .padStart(12, '0')}`

    return this.binaryToID(BINARY)
  }

  static deconstruct(snowflake: string) {
    const BINARY = this.idToBinary(snowflake)
      //.toString(2)
      .padStart(64, '0')

    const res = {
      timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
      workerID: parseInt(BINARY.substring(42, 47), 2),
      processID: parseInt(BINARY.substring(47, 52), 2),
      increment: parseInt(BINARY.substring(52, 64), 2),
      binary: BINARY,
    }

    Object.defineProperty(res, 'date', {
      get: function get() {
        return new Date(this.timestamp)
      },
      enumerable: true,
    })

    return res
  }

  static idToBinary(num: string) {
    let bin = ''

    let high = parseInt(num.slice(0, -10)) || 0
    let low = parseInt(num.slice(-10))

    while (low > 0 || high > 0) {
      bin = String(low & 1) + bin
      low = Math.floor(low / 2)
      if (high > 0) {
        low += 5000000000 * (high % 2)
        high = Math.floor(high / 2)
      }
    }

    return bin
  }

  static binaryToID(num: any) {
    let dec = ''

    while (num.length > 50) {
      const high = parseInt(num.slice(0, -32), 2)
      const low = parseInt((high % 10).toString(2) + num.slice(-32), 2)

      dec = (low % 10).toString() + dec
      num =
        Math.floor(high / 10).toString(2) +
        Math.floor(low / 10)
          .toString(2)
          .padStart(32, '0')
    }

    num = parseInt(num, 2)
    while (num > 0) {
      dec = (num % 10).toString() + dec
      num = Math.floor(num / 10)
    }

    return dec
  }
}