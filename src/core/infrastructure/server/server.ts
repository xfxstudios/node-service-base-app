import express, { Application } from 'express'
import router from '../../application/routes/api.routes'
import { serviceConfig } from '../config/services.config'

export class Server {
  protected app: Application
  protected port: any
  protected prefix: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT || 0
    this.prefix = process.env.PREFIX || '/api'
    this.middleware()
    this.restRoutes()
  }

  async middleware () {
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(express.urlencoded({ extended: true }))
  }

  async restRoutes () {
    this.app.use(this.prefix, router)
  }

  init () {
    const listener = this.app.listen(this.port, () => {
      serviceConfig.logger.setLog(`Server listen on http://localhost:${listener.address().port}`)
    })
  }
}
