import { repositoryConfig } from '../../infrastructure/config/repository.config'
import { ValidDtoParams } from '../../infrastructure/decorators/appDecorators'
import { GetCountryDTO } from '../dto/getCountryDTO'

export class GetCountry {
  @ValidDtoParams()
  async execute (data: GetCountryDTO) {
    const _request = await repositoryConfig.appRepository._getCountryFromCode(data)

    return {
      error: false,
      requesData: data.serialize(),
      country: _request
    }
  }
}
