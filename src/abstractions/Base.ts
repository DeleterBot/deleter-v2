import DeleterClient from '@src/structures/DeleterClient'

export default class Base {
  public client: DeleterClient
  public blankFn = () => {} // eslint-disable-line no-empty
  public errFn = (err: any) => console.error(err)

  constructor() {
    this.client = global.client
  }
}