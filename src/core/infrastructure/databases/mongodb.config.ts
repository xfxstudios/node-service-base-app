import {serviceConfig} from "../config/services.config";

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const _configdb = JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/databases.config`)))


const mongoConnect = () => {

    let _connections = {}
    
    _configdb.mongo.forEach(async (item) => {
      let mongoOptions:any = {}
      let mongoCon:any = null
      let _url:String = "";
  
      Object.keys(item.config).map((confi) => {
        mongoOptions={
          ...mongoOptions,
          [confi]: item.config[confi]
        };
      })
  
      if(item.passwordused){
        _url = `mongodb://${item.username}:${item.password}@${item.host}:${item.port}/${item.dbname}`
      }else{
        _url = `mongodb://${item.host}:${item.port}/${item.dbname}`
      }
      try{
        mongoCon = mongoose.createConnection(_url, mongoOptions)
        _connections[item.name] = mongoCon
      }catch(e) {
        serviceConfig.logger.setError(e.message,e)
      }
    })
    
    return _connections
};

export const mongoConnections = mongoConnect();