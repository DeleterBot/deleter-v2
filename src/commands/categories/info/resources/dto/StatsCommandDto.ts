import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'
import { IsNumberString } from 'class-validator'

export default class StatsCommandDto extends AbstractCommandDto {

  @IsNumberString()
  declare a1: number

}
