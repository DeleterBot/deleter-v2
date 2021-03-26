import { IsSnowflake } from '@api/decorators/is-snowflake.decorator'

export default class RevokeTokenDto {

  @IsSnowflake()
  public client_id!: string

}
