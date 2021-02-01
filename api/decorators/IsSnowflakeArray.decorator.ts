import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsSnowflakeArray(maxArrayLength = 500, validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsSnowflakeArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxArrayLength],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [ relatedPropertyName ] = args.constraints
          const maxArrayLength = relatedPropertyName

          let isValid = false

          if (Array.isArray(value)) {
            if (value.length <= maxArrayLength) {
              const notValidValues = value.filter(v => {
                if (typeof v === 'string') {
                  if (v.length >= 17 && v.length <= 19) return false
                }

                return true
              })

              if (!notValidValues.length) isValid = true
            }
          }

          return isValid
        }
      }
    })
  }
}