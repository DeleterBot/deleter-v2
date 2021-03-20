import {
  Injectable, InternalServerErrorException,
} from '@nestjs/common'
import AuthGuard from '@api/guards/auth.guard'
import { promisify } from 'util'

const wait = promisify(setTimeout)

@Injectable()
export default class IsShardsLoadedGuard extends AuthGuard {
  async canActivate(): Promise<boolean> {

    if (!this.manager.shards.size) {
      await wait(10000)
      if (!this.manager.shards.size)
        throw new InternalServerErrorException({
          message: 'shards haven\'t created yet'
        })
    }

    return true
  }
}
