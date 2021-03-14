import TokenDto from '@api/dto/oauth2/token.dto'
import { IsOptional, IsString } from 'class-validator'
import { IsSnowflake } from '@api/decorators/is-snowflake.decorator'

export default class RefreshTokenDto extends TokenDto {

  // @ts-ignore
  @IsSnowflake({
    message: 'user_id must be a string (snowflake)'
  })
  public user_id!: string

  @IsString()
  refresh_token!: string

  @IsOptional()
  // @ts-ignore
  public code: unknown

}
