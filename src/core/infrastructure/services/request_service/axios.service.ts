import { IRequestContract } from '../../../domain/contract/iRequestContract'
import { IRequestHeaders } from '../../../domain/interfaces/iAppInterfaces'
import { appConfig } from '../../config/index.config'
import { serviceConfig } from '../../config/services.config'
import { axiosCore } from './axiosCore'

export class AxiosService implements IRequestContract {
  async doPost (url: string, data?: any, headers?: IRequestHeaders[]): Promise<any> {
    return await this.execute('POST', url, data, headers)
  }

  async doGet (url: string, data?: any, headers?: IRequestHeaders[]): Promise<any> {
    return await this.execute('GET', url, data, headers)
  }

  async doPut (url: string, data?: any, headers?: IRequestHeaders[]): Promise<any> {
    return await this.execute('PUT', url, data, headers)
  }

  async doDelete (url: string, data?: any, headers?: IRequestHeaders[]): Promise<any> {
    return await this.execute('DELETE', url, data, headers)
  }

  async doPath (url: string, data?: any, headers?: IRequestHeaders[]): Promise<any> {
    return await this.execute('PATH', url, data, headers)
  }

  private async execute (verb: String, url: String, params: any, headers?: IRequestHeaders[]) {
    let requestHeaders = {}

    headers.map((item) => {
      requestHeaders = {
        ...requestHeaders,
        [item.key]: item.value
      }
    })

    try {
      let result
      switch (verb) {
        case 'GET':
          result = await axiosCore.get(url, { params, headers: requestHeaders })
          break
        case 'POST':
          result = await axiosCore.post(url, params, { headers: requestHeaders })
          break
        case 'PUT':
          result = await axiosCore.put(url, params, { headers: requestHeaders })
          break
        case 'DELETE':
          result = await axiosCore.delete(url, { params, headers: requestHeaders })
          break
        case 'PATH':
          result = await axiosCore.path(url, { params, headers: requestHeaders })
          break
        default:
          throw new TypeError('Not implemented verb')
      }

      return result?.data
    } catch (err) {
      serviceConfig.logger.setError(err.message, err)

      return err.message
    }
  }
}
