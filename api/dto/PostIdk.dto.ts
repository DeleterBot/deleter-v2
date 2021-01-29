import { IsOptional } from 'class-validator'
import { IsSnowflakeArray } from '@api/decorators/IsSnowflakeArray.decorator'
import Discord from 'discord.js'

export default class PostIdkDto {

  @IsOptional()
  @IsSnowflakeArray(10, {
    message: 'notidk must be Array<Discord.Snowflake> and less than 10 in length'
  })
  notidk: Array<Discord.Snowflake> | undefined

}