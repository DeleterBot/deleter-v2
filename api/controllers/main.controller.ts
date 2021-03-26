import AbstractController from '@api/abstractions/abstract.controller'
import { Get, Controller } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

@Controller()
export default class MainController extends AbstractController {

  @Get('/')
  @Throttle(30, 60)
  execute() {
    return 'Don\'t worry, API works successfully.'
  }

}
