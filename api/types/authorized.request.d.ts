import { Request } from '@nestjs/common'
import RequestUser from '@api/types/request.user'

export default interface AuthorizedRequest extends Request {
  user: RequestUser
}