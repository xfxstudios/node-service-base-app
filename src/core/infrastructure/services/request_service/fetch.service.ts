import { IRequestContract } from '../../../domain/contract/iRequestContract'
import { IRequestHeaders } from '../../../domain/interfaces/iAppInterfaces'
const request = require('request')

export class FetchService implements IRequestContract {
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
    return await new Promise((resolve, reject) => {
      let requestHeaders = {}

      headers.map((item) => {
        requestHeaders = {
          ...requestHeaders,
          [item.key]: item.value
        }
      })

      const options = {
        method: verb,
        url,
        headers: requestHeaders,
        body: JSON.stringify(params)
      }

      request(options, function (error, response) {
        if (error) reject(error.message)
        resolve(JSON.parse(response.body))
      })
    })
  }
}
