import { Request, Response } from 'express'
import { GetCountryDTO } from '../../domain/dto/getCountryDTO'
import { GetCountry } from '../../domain/use_case/getCountry.case'
import { LogRequest } from '../../infrastructure/decorators/appDecorators'
import { GetJsonPlaceholderCase } from '../../domain/use_case/getJsonPlaceholder.case'

export class ApiController {
  @LogRequest()
  async test (req: Request, res: Response) {
    const _process = new GetJsonPlaceholderCase()
    const _response: any = await _process.execute()

    res.json(_response)
  }

  @LogRequest()
  async getCountry (req: Request, res: Response) {
    const _process = new GetCountry()
    const _data = new GetCountryDTO(req.params)
    const response: any = await _process.execute(_data)

    res.json(response)
  }
}
