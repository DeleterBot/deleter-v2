import DeleterClient from '@src/structures/DeleterClient'

export default class Base {
  public deleter: DeleterClient
  public blankFn = () => {} // eslint-disable-line no-empty
  public errFn = (err: any) => console.error(err)

  constructor() {
    this.deleter = global.deleter
  }
}
