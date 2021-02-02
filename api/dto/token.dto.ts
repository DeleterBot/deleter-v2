import { IsString } from 'class-validator'
import { IsSnowflake } from '@api/decorators/IsSnowflake.decorator'

export default class TokenDto {

  @IsString()
  public redirect_uri!: string

  // @ts-ignore
  @IsSnowflake({
    message: 'client_id must be a string (snowflake)'
  })
  public client_id!: string

  @IsString()
  public code!: string
}