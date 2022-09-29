import { ValidationError, validate } from 'class-validator'

export class ValidateService {
  async validateRequestData (data: any) {
    const errors: ValidationError[] = await validate(data)
    const outData = []

    if (errors.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        const e = JSON.parse(JSON.stringify(errors[i]))
        const eData = {
          propertyType: e.property,
          propertyValue: e.value ?? 'no Data',
          propertyError: e.constraints
        }

        outData.push(eData)
      }
      return {
        error: true,
        requesData: data.serialize(),
        errors: outData,
        message: 'Error en los datos recibidos'
      }
    } else {
      return false
    }
  }
}
