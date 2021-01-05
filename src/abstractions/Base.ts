import DeleterClient from '@/structures/DeleterClient'

export default class Base {
  public client: DeleterClient
  public blankFn = () => {} // eslint-disable-line no-empty
  public errFn = (err: any) => console.error(err)

  constructor() {
    // @ts-ignore
    this.client = global.client
  }
}