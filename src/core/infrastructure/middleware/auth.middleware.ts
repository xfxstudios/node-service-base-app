import { Request, Response, NextFunction } from 'express'
import { serviceConfig } from '../config/services.config'

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  serviceConfig.logger.setLog(`Endpoint de autorización ${req.url}`)
  next()
}
