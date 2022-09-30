import { ValidationError, validate } from 'class-validator'
import { generalEnum } from '../../enums/general.enum'

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
        message: generalEnum.ERROR_DTO_VALIDATE
      }
    } else {
      return false
    }
  }
}
