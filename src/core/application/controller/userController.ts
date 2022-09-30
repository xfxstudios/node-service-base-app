import {Request, Response} from 'express'
import {LogRequest} from '../../infrastructure/decorators/appDecorators'

export class UserController {

  @LogRequest()
  async getUser(req:Request, res:Response){
    res.send('Data de usuario')
  }
  @LogRequest()
  async newUser(req:Request, res:Response){
    res.send('Nuevo Usuario')
  }
  @LogRequest()
  async updateUser(req:Request, res:Response){
    res.send('Actualizado usuario')
  }
  @LogRequest()
  async deleteUser(req:Request, res:Response){
    res.send('Eliminacion de usuario')
  }

}