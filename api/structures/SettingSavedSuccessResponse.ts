export default class SettingSavedSuccessResponse {
  public statusCode: number
  public message: string

  constructor() {
    this.statusCode = 200
    this.message = 'settings saved.'
  }
}