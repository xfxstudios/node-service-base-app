import express, { Application } from 'express'
import router from '../../application/routes/api.routes'
import { authRoutes } from '../../application/routes/auth.routes'
import { serviceConfig } from '../config/services.config'
import {databases} from '../databases/index.databases'
import { generalEnum } from '../enums/general.enum'
const expressListRoutes = require('express-list-routes')

export class Server {
  protected app: Application
  protected port: any
  protected prefix: string

  constructor () {}

  async prepareParams(){
    return new Promise(async (resolve, reject) => {
      try{
        await serviceConfig.logger.setSteep({message:'Preparing properties',number:1})
        this.app = express()
        this.port = process.env.PORT || 0
        this.prefix = process.env.PREFIX || '/api'
        await serviceConfig.logger.setSuccess('Properties started')
        resolve(true)
      }catch(e){
        await serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }
    })
  }

  async middleware () {
    return new Promise(async (resolve, reject) => {
      try{
        await serviceConfig.logger.setSteep({message:'Preparing middlewares',number:2})
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({ extended: true }))
        await serviceConfig.logger.setSuccess('Middleware started')
        resolve(true)
      }catch(e){
        await serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }

    })
  }

  async restRoutes () {
    return new Promise(async (resolve, reject) => {
      try{
        await serviceConfig.logger.setSteep({message:'Preparing routes',number:3})
        this.app.use(this.prefix, router)// [ Express estandard routes ]
        authRoutes(this.prefix, this.app)// [ Expres routes group ]
        await serviceConfig.logger.setSuccess('Routes loaded')
        resolve(true)
      }catch(e){
        await serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }
    })
  }

  async logRoutes () {
    return new Promise(async (resolve, reject) => {
      try{
        await serviceConfig.logger.setSteep({message:'Loggin routes',number:4})
        expressListRoutes(this.app)
        await serviceConfig.logger.setSuccess('Routes logged')
        resolve(true)
      }catch(e){
        await serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }
    })
  }
  
  async initDatabses(){
    return new Promise(async (resolve, reject) => {
      try{
        await serviceConfig.logger.setSteep({message:'Starting Databases Connections',number:5})
        await databases
        await serviceConfig.logger.setSuccess('Databases started')
        resolve(true)
      }catch(e){
        await serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }
    })
  }

  init () {
    this.prepareParams()
    .then((_) => this.middleware())
    .then((_) => this.restRoutes())
    .then((_) => this.logRoutes())
    .then((_) => this.initDatabses())
    .then((_) => {
      const listener = this.app.listen(this.port, async () => {
        await serviceConfig.logger.setTitle({message: generalEnum.SERVER_INIT.replace('$1', `http://localhost:${listener.address().port} `), level:'success'})
      })
    })
    .catch(async (e)=>{
      await serviceConfig.logger.setError(e.message, e);
    })
  }
}
