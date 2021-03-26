import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsSnowflakeArray(
  maxLength = 500,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  // @ts-ignore
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsSnowflakeArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [ maxLength ],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [ relatedPropertyName ] = args.constraints
          const maxLength = relatedPropertyName

          let isValid = false

          if (Array.isArray(value)) {
            if (value.length <= maxLength) {
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
        },

        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must be an array of strings (snowflake) and have a length`
            + ` of no more than ${validationArguments?.constraints[0]}`
        }
      }
    })
  }
}
