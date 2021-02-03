import {
  IsHexColor,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'
import LangDto from '@api/dto/lang.dto'
import { Type } from 'class-transformer'
import IgnoreDto from '@api/dto/ignore.dto'

export default class GeneralSettingsDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  public prefix!: string

  @IsString()
  @IsHexColor()
  public color!: string

  @ValidateNested()
  @Type(() => LangDto)
  public lang!: LangDto

  @ValidateNested()
  @Type(() => IgnoreDto)
  public ignore!: IgnoreDto

}