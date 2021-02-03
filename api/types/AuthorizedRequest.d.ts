import { Request } from '@nestjs/common'
import RequestUser from '@api/types/RequestUser'

export default interface AuthorizedRequest extends Request {
  user: RequestUser
}