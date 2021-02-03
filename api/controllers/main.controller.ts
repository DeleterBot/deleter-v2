import AbstractController from '@api/abstractions/abstract.controller'
import { Get, Controller } from '@nestjs/common'

@Controller()
export default class MainController extends AbstractController {

  @Get('/')
  execute() {
    return 'Don\'t worry, API works successfully.'
  }

}