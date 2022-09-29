import { Server } from './core/infrastructure/server/server'

require('dotenv').config()

const serverApp = new Server()
serverApp.init()
