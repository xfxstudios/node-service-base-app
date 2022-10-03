import { serviceConfig } from '../../infrastructure/config/services.config'

export class EncryptTestCase {
  async _encrypt (_data: any) {
    return await serviceConfig.penEcryptService.encryptInfo(_data)
      .then((info) => {
        return {
          error: false,
          info
        }
      }).catch((e) => {
        return {
          error: true,
          message: e
        }
      })
  }

  async _decript (_data: any) {
    return await serviceConfig.penEcryptService.decrypInfo(_data)
      .then((info) => {
        return {
          error: false,
          info
        }
      }).catch((e) => {
        return {
          error: true,
          message: e
        }
      })
  }
}
