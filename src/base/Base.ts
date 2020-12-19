import Deleter from '@/structures/Client'

export default class Base {
  public client: Deleter

  constructor() {
    // @ts-ignore
    this.client = global.client
  }
}