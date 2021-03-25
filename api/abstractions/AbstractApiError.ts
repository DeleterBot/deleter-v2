import Constants from '@api/utils/Constants'

export default interface AbstractApiError {
  message?: string
  code?: typeof Constants.codes
}
