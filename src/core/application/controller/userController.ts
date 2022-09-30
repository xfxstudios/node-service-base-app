import { Request, Response } from 'express'
import {NewUserDTO} from '../../domain/dto/newUserDTO'
import {NewUserCase} from '../../domain/use_case/newUser.case'
import { LogRequest } from '../../infrastructure/decorators/appDecorators'

export class UserController {
  @LogRequest()
  async getUser (req: Request, res: Response) {
    res.send('Data de usuario')
  }

  @LogRequest()
  async newUser (req: Request, res: Response) {
    const _process = new NewUserCase()
    const _data = new NewUserDTO(req.body)
    const _response = await _process.execute(_data)
    res.json(_response)
  }

  @LogRequest()
  async updateUser (req: Request, res: Response) {
    res.send('Actualizado usuario')
  }

  @LogRequest()
  async deleteUser (req: Request, res: Response) {
    res.send('Eliminacion de usuario')
  }
}
