import AbstractController from '@api/abstractions/abstract.controller'
import { Get, Controller } from '@nestjs/common'
import { RateLimit } from 'nestjs-fastify-rate-limiter'

@Controller()
export default class MainController extends AbstractController {

  @Get('/')
  @RateLimit({ points: 30, duration: 60 })
  execute() {
    return 'Don\'t worry, API works successfully.'
  }

}
