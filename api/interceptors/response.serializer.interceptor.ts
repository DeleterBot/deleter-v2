import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { from, Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import AbstractApiResponse from '@api/abstractions/AbstractApiResponse'

@Injectable()
export default class ResponseSerializerInterceptor implements NestInterceptor {

  private async serializeResponse(response: Response): Promise<any> {
    return new AbstractApiResponse({
      result: response,
      success: true
    })
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      switchMap((response) => {
        return from(this.serializeResponse(response))
      })
    )
  }

}
