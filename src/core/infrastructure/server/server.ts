import express, { Application } from 'express'
import router from '../../application/routes/api.routes'
import {authRoutes} from '../../application/routes/auth.routes'
import { serviceConfig } from '../config/services.config'
import { generalEnum } from '../enums/general.enum'
const expressListRoutes = require('express-list-routes')


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
    this.logRoutes()
  }

  async middleware () {
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(express.urlencoded({ extended: true }))
  }

  async restRoutes () {
    this.app.use(this.prefix, router)// [ Express estandard routes ]
    authRoutes(this.prefix, this.app)// [ Expres routes group ]
  }

  async logRoutes () {
    expressListRoutes(this.app)
  }

  init () {
    const listener = this.app.listen(this.port, () => {
      serviceConfig.logger.setLog(generalEnum.SERVER_INIT.replace('$1', `http://localhost:${listener.address().port}`))
    })
  }
}
