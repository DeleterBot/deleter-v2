import AbstractCommandDto from '@src/abstractions/AbstractCommandDto'
import DeleterCommandMessage from '@src/types/deleter/DeleterCommandMessage'
import Info from '@src/types/Info'
import { validate, ValidatorOptions } from 'class-validator'

export default class CommandDtoProcessor {

  public static validate(
    msg: DeleterCommandMessage,
    info: Info,
    Dto: typeof AbstractCommandDto,
    options?: ValidatorOptions
  ) {

    if (!Dto.argsCount && !Dto.validateAll) return Promise.reject('invalid dto class')

    const dtoPrepare: Record<string, any> = { all: [] },
      latestArg = Dto.validateAll ? Infinity : Dto.argsCount

    info.args.forEach((argument, index) => {
      if (index < latestArg) {
        dtoPrepare[`a${index + 1}`] = argument
      } else {
        dtoPrepare.all.push(argument)
      }
    })

    global.deleter.logger.log(undefined, dtoPrepare)

    const dto = new Dto(dtoPrepare)
    return validate(dto, options)

  }

}
