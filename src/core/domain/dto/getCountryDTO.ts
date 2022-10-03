import { IGetCountryByIso } from '../interfaces/iAppInterfaces'
import { IsString, IsNotEmpty } from 'class-validator'
import { HashPassword } from '../../infrastructure/decorators/appDecorators'

export class GetCountryDTO {
  @IsString()
  @IsNotEmpty()
  private readonly iso: String

  constructor (data: IGetCountryByIso) {
    this.iso = data.iso
  }

  getIso (): String {
    return this.iso
  }

  serialize (): any {
    return {
      iso: this.getIso()
    } as IGetCountryByIso
  }
}
