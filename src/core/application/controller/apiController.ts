import { Request, Response } from 'express'
import { GetCountryDTO } from '../../domain/dto/getCountryDTO'
import { GetCountry } from '../../domain/use_case/getCountry.case'
import { LogRequest } from '../../infrastructure/decorators/appDecorators'

export class ApiController {
  @LogRequest()
  async test (req: Request, res: Response) {
    res.status(200).json({
      error: false,
      message: 'Hello World'
    })
  }

  @LogRequest()
  async getCountry (req: Request, res: Response) {
    const _process = new GetCountry()
    const _data = new GetCountryDTO(req.params)
    const response: any = await _process.execute(_data)

    res.json(response)
  }
}
