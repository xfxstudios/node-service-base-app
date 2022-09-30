import { GetCountryDTO } from '../../domain/dto/getCountryDTO'
import { serviceConfig } from '../config/services.config'

export class AppRepository {
  async _getCountryFromCode (code: GetCountryDTO) {
    const _data = await serviceConfig.requestService.doGet(`https://restcountries.com/v3.1/alpha/${code.getIso()}`, {}, [])
    return _data
  }

  async getJsonPlaceholder () {
    const _data = await serviceConfig.requestService.doGet('https://jsonplaceholder.typicode.com/posts', {}, [])
    return _data
  }
}
