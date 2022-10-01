import {mongoConnections} from "./mongodb.config"


const _initConnections = () => {
  let connections:any = {}
  connections['mongodb'] = mongoConnections
  
  return connections
}

export const databases = _initConnections()