export default class Constants {

  static get site() {
    return global.client.user!.id === '535501696454098947'
      ? 'https://deleter.xyz/'
      : global.client.user!.id === '530818177144324121'
      ? 'https://canary.deleter.xyz/'
      : 'http://localhost:8080/'
  }

}