import { IsSnowflake } from '@api/decorators/is-snowflake.decorator'

export default class RevokeTokenDto {

  @IsSnowflake({
    message: 'client_id must be a string (snowflake)'
  })
  public client_id!: string

}
