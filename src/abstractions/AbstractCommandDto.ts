export default class AbstractCommandDto {
  public static readonly isDto = true

  public static argsCount = 1
  public static validateAll = false

  a1!: any
  all: any[] = []

  constructor(config: Record<string, any>) {
    Object.assign(this, config)
  }

}
