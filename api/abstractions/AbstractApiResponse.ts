import AbstractApiError from '@api/abstractions/AbstractApiError'

export default class AbstractApiResponse {
  success!: boolean

  result!: any

  messages!: Array<any>

  errors!: Array<AbstractApiError>

  constructor(data: Record<string, any>) {
    this.success = !!data.success

    this.result = data.result ?? null

    this.messages = data.messages ?? []

    this.errors = data.errors ?? []
  }
}
