import { Router, Request, Response } from 'express'
import { controllerConfig } from '../../infrastructure/config/controllers.config'

const router = Router()

// ROUTES
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!!!!')
})

router.get('/test', controllerConfig.apiController.test)

router.get('/get-country/:iso?', controllerConfig.apiController.getCountry)

export default router
