import { Request, Response } from 'express'
import { GetCountryDTO } from '../../domain/dto/getCountryDTO'
import { GetCountry } from '../../domain/use_case/getCountry.case'
import { LogRequest } from '../../infrastructure/decorators/appDecorators'
import { GetJsonPlaceholderCase } from '../../domain/use_case/getJsonPlaceholder.case';
import {EncryptTestCase} from '../../domain/use_case/encryptTest.case';


export class ApiController {
  @LogRequest()
  async test (req: Request, res: Response) {
    const _process = new GetJsonPlaceholderCase()
    const _response: any = await _process.execute()
    res.status(_response.error?400:200).json(_response)
  }

  @LogRequest()
  async getCountry (req: Request, res: Response) {
    const _process = new GetCountry()
    const _data = new GetCountryDTO(req.params)
    const response: any = await _process.execute(_data)
    res.status(response.error?400:200).json(response)
  }

  @LogRequest()
  async encryptData (req: Request, res: Response) {
    const _process = new EncryptTestCase()
    const response: any = await _process._encrypt(req.body)
    res.status(response.error?400:200).json(response)
  }

  @LogRequest()
  async decryptData (req: Request, res: Response) {
    const _process = new EncryptTestCase()
    const response: any = await _process._decript(req.body)
    res.status(response.error?400:200).json(response)
  }
}
