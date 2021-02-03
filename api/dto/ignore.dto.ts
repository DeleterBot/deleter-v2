import Discord from 'discord.js'
import { IsSnowflakeArray } from '@api/decorators/is-snowflake-array.decorator'
import { IsArray } from 'class-validator'

export default class IgnoreDto {

  @IsArray()
  // @ts-ignore
  @IsSnowflakeArray(500)
  channels!: Array<Discord.Snowflake>

  @IsArray()
  // @ts-ignore
  @IsSnowflakeArray(250)
  roles!: Array<Discord.Snowflake>

}