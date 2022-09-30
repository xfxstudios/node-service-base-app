import { Router, Request, Response } from 'express'
import { controllerConfig } from '../../infrastructure/config/controllers.config'

const router = Router()
const {apiController, userController} = controllerConfig;

// ROUTES
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!!!!')
})

router.get('/test', apiController.test)
router.get('/get-country/:iso?', apiController.getCountry)

router.route('/user')
  .post(userController.newUser)
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

export default router
