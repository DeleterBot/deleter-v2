import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'
import { IsNumberString } from 'class-validator'

export default class StatsCommandDto extends AbstractCommandDto {

  @IsNumberString()
  a1!: number

}
