import { serviceConfig } from '../config/services.config'
import { mongoConnections } from './mongodb.config'

const _initConnections = () => {
  try {
    const connections: any = {}
    // [ All connections here ]
    connections.mongodb = mongoConnections
    // connections['mysql'] = mysql_connection_script_here

    return connections
  } catch (e) {
    serviceConfig.logger.setError(e.message, e)
    return false
  }
}

export const databases = _initConnections()
