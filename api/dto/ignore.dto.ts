import { IsSnowflakeArray } from '@api/decorators/is-snowflake-array.decorator'
import { IsArray } from 'class-validator'

export default class IgnoreDto {

  @IsArray()
  @IsSnowflakeArray(500)
  channels!: Array<string>

  @IsArray()
  @IsSnowflakeArray(250)
  roles!: Array<string>

}
