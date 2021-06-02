import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import CommandExecutionContext from '@src/types/commands/CommandExecutionContext'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'

export default class CommandDtoProcessor {
  public static readonly isUtils = true

  public static async validate(
    msg: DeleterCommandMessage,
    context: CommandExecutionContext,
    Dto: typeof AbstractCommandDto,
    options?: ValidatorOptions
  ): Promise<{ errors: ValidationError[], dto: AbstractCommandDto }> {

    if (!Dto.argsCount && !Dto.validateAll) return Promise.reject('invalid dto class')

    const dtoPrepare: Record<string, any> = { all: [] },
      latestArg = Dto.validateAll ? Infinity : Dto.argsCount

    context.args.forEach((argument, index) => {
      if (index < latestArg) {
        dtoPrepare[`a${index + 1}`] = argument
      } else {
        dtoPrepare.all.push(argument)
      }
    })

    global.deleter.logger.log(undefined, dtoPrepare)

    const dto = new Dto(dtoPrepare)
    return { errors: await validate(dto, options), dto }

  }

}
