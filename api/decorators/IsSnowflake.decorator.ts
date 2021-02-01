import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsSnowflake(validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsSnowflake',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {

          if (typeof value === 'string') {
            if (value.length >= 17 && value.length <= 19)
              return true
          }

          return false
        }
      }
    })
  }
}