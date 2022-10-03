import { Request, Response } from 'express'
import { NewUserDTO } from '../../domain/dto/newUserDTO'
import { GetUserInfoCase } from '../../domain/use_case/getUserInfo.case'
import { GetUserListCase } from '../../domain/use_case/getUserList.case'
import { NewUserCase } from '../../domain/use_case/newUser.case'
import { LogRequest } from '../../infrastructure/decorators/appDecorators'

export class UserController {
  @LogRequest()
  async getUsers (req: Request, res: Response) {
    const _process = new GetUserListCase()
    const _response = await _process.execute()
    res.json(_response)
  }

  @LogRequest()
  async getUserById (req: Request, res: Response) {
    const _process = new GetUserInfoCase()
    const _response = await _process.execute(req.params.id)
    res.json(_response)
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
