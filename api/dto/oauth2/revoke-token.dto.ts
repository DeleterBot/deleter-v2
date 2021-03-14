import { IsSnowflake } from '@api/decorators/is-snowflake.decorator'

export default class RevokeTokenDto {

  // @ts-ignore
  @IsSnowflake({
    message: 'client_id must be a string (snowflake)'
  })
  public client_id!: string

}
