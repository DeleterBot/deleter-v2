import AbstractController from '@api/abstractions/abstract.controller'
import { Get, Controller } from '@nestjs/common'

@Controller()
export default class MainController extends AbstractController {

  @Get('/')
  findAll(): string {
    console.log(this)
    return 'Don\'t worry, API works successfully.'
  }

}