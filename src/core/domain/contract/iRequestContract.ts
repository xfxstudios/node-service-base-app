import { IRequestHeaders } from '../interfaces/iAppInterfaces'

export interface IRequestContract {
  doPost: (url: string, data?: any, headers?: IRequestHeaders[]) => Promise<any>
  doGet: (url: string, data?: any, headers?: IRequestHeaders[]) => Promise<any>
  doPut: (url: string, data?: any, headers?: IRequestHeaders[]) => Promise<any>
  doDelete: (url: string, data?: any, headers?: IRequestHeaders[]) => Promise<any>
  doPath: (url: string, data?: any, headers?: IRequestHeaders[]) => Promise<any>
}
