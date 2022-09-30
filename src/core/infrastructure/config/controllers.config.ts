import { ApiController } from '../../application/controller/apiController'
import {UserController} from '../../application/controller/userController'

const apiController = new ApiController()
const userController = new UserController()

export const controllerConfig = {
  apiController,
  userController
}
