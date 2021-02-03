import { IsDivisibleBy, IsNumber, Max, Min } from 'class-validator'

export default class QiwiBillingCreateDto {

  @IsNumber()
  @Max(10000)
  @Min(10)
  @IsDivisibleBy(2)
  amount!: number

}
