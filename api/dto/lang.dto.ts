import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import Constants from '@api/utils/Constants'

export default class LangDto {

  @IsString()
  @IsNotEmpty()
  @IsIn(Constants.VALID_LANGUAGES)
  commands!: string

  @IsString()
  @IsNotEmpty()
  @IsIn(Constants.VALID_LANGUAGES)
  interface!: string

}