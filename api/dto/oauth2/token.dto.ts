import { IsString } from 'class-validator'
import { IsSnowflake } from '@api/decorators/is-snowflake.decorator'

export default class TokenDto {

  @IsString()
  public redirect_uri!: string

  @IsSnowflake()
  public client_id!: string

  @IsString()
  public code!: string
}
