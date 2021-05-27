import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ForbiddenException, HttpException,
  InternalServerErrorException
} from '@nestjs/common'
import { ThrottlerException } from '@nestjs/throttler'
import AbstractApiResponse from '@api/abstractions/AbstractApiResponse'
import { BaseExceptionFilter } from '@nestjs/core'
import Logger from '@src/utils/Logger'

@Catch()
export default class AllExceptionsFilter extends BaseExceptionFilter {
  private logger: Logger = new Logger()

  catch(exception: any, host: ArgumentsHost): any {

    const res = host.switchToHttp().getResponse()
    const response = exception.response

    if (exception instanceof ThrottlerException) {

      res.code(429).send(
        new AbstractApiResponse({
          success: false,
          errors: [ { message: 'Too Many Requests', code: 0 } ]
        })
      )

    } else if (exception instanceof InternalServerErrorException || !(exception instanceof HttpException)) {

      this.logger.error('fastify', exception)
      res.code(500).send(
        new AbstractApiResponse({
          success: false,
          errors: [ { message: 'Internal Server Error', code: 10000 } ]
        })
      )

    } else if (exception instanceof BadRequestException) {

      res.code(400).send(
        new AbstractApiResponse({
          success: false,
          messages: Array.isArray(response.message)
            ? response.message
            : response.message
              ? [ response.message ]
              : [],
          errors: [ { message: 'Bad Request', code: 0 } ]
        })
      )

    } else if (exception instanceof ForbiddenException) {

      res.code(403).send(
        new AbstractApiResponse({
          success: false,
          errors: [ response ]
        })
      )

    } else {

      res.code((exception as any).status || 500).send(
        new AbstractApiResponse({
          success: false,
          errors: [ { message: exception.message || 'Unknown Error', code: 0 } ]
        })
      )

      if (!(exception as any).status || !exception.message)
        this.logger.error('fastify', exception)

    }

  }

}
