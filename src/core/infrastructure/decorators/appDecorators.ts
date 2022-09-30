import { serviceConfig } from '../config/services.config'

/**
 * Valida los decoradores usados en los DTOs con class-validator
 * @returns Function
 */
export function ValidDtoParams () {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value

    descriptor.value = async function (...arg: any) {
      const _valid = await serviceConfig.validateService.validateRequestData(arg[0])
      if (_valid) {
        return _valid
      }
      return original.apply(this, arg)
    }
  }
}

/**
 * Realiza el log de la request entrante a un metodo de controlador express
 * @returns Function
 */
export function LogRequest () {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value

    descriptor.value = async function (...arg: any) {
      const body = arg[0].body
      const params = arg[0].params
      const headers = arg[0].headers
      const method = arg[0].method
      const originalUrl = arg[0].originalUrl
      const url = arg[0].url
      const endpoint = arg[0].url.split('/')[1]

      await serviceConfig.logger.setDebug('Express Request', { body, params, headers, method, originalUrl, url, endpoint })
      return original.apply(this, arg)
    }
  }
}
