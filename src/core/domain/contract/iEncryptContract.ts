import { IKeys } from '../interfaces/iAppInterfaces'

export interface IEncryptContract {
  createKeys: (data: IKeys) => Promise<any>
  encryptInfo: (data: any) => Promise<any>
  decrypInfo: (data: any) => Promise<any>
}
