import DeleterClient from '@/structures/DeleterClient'

export default class Base {
  public client: DeleterClient

  constructor() {
    // @ts-ignore
    this.client = global.client
  }
}