import express, { Application } from 'express'
import router from '../../application/routes/api.routes'
import { authRoutes } from '../../application/routes/auth.routes'
import { serviceConfig } from '../config/services.config'
import { databases } from '../databases/index.databases'
import { generalEnum } from '../enums/general.enum'
const expressListRoutes = require('express-list-routes')

export class Server {
  protected app: Application
  protected port: any
  protected prefix: string

  constructor () {}

  async prepareParams () {
    return await new Promise(async (resolve, reject) => {
      try {
        this.app = express()
        this.port = process.env.PORT || 0
        this.prefix = process.env.PREFIX || '/api'
        await serviceConfig.logger.setSuccess('Properties started')
        resolve(true)
      } catch (e) {
        await serviceConfig.logger.setError(e.message, e)
        reject(e.message)
      }
    })
  }

  async middleware () {
    return await new Promise(async (resolve, reject) => {
      try {
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({ extended: true }))
        await serviceConfig.logger.setSuccess('Middleware started')
        resolve(true)
      } catch (e) {
        await serviceConfig.logger.setError(e.message, e)
        reject(e.message)
      }
    })
  }

  async restRoutes () {
    return await new Promise(async (resolve, reject) => {
      try {
        this.app.use(this.prefix, router)// [ Express estandard routes ]
        authRoutes(this.prefix, this.app)// [ Expres routes group ]
        await serviceConfig.logger.setSuccess('Routes loaded')
        resolve(true)
      } catch (e) {
        await serviceConfig.logger.setError(e.message, e)
        reject(e.message)
      }
    })
  }

  async logRoutes () {
    return await new Promise(async (resolve, reject) => {
      try {
        expressListRoutes(this.app)
        await serviceConfig.logger.setSuccess('Routes logged')
        resolve(true)
      } catch (e) {
        await serviceConfig.logger.setError(e.message, e)
        reject(e.message)
      }
    })
  }

  async initDatabses () {
    return await new Promise(async (resolve, reject) => {
      try {
        await databases
        await serviceConfig.logger.setSuccess('Databases started')
        resolve(true)
      } catch (e) {
        await serviceConfig.logger.setError(e.message, e)
        reject(e.message)
      }
    })
  }

  init () {
    this.prepareParams()
      .then(async (_) => await this.middleware())
      .then(async (_) => await this.restRoutes())
    // .then((_) => this.logRoutes())
      .then(async (_) => await this.initDatabses())
      .then((_) => {
        const listener = this.app.listen(this.port, async () => {
          await serviceConfig.logger.setTitle({ message: generalEnum.SERVER_INIT.replace('$1', `http://localhost:${listener.address().port} `), level: 'success' })
        })
      })
      .catch(async (e) => {
        await serviceConfig.logger.setError(e.message, e)
      })
  }
}
