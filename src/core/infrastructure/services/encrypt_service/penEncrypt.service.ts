import {IEncryptContract} from "../../../domain/contract/iEncryptContract";
import {IKeys} from "../../../domain/interfaces/iAppInterfaces";
import {serviceConfig} from "../../config/services.config";
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

export class PenEncryptService implements IEncryptContract{
  async createKeys(data:IKeys): Promise<any> {

    return new Promise((resolve, reject) => {
      try{
        const PASSPHRASE = data.passphrase??process.env.PASSPHRASE

        const KEY_PAIR_OPTIONS = {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: PASSPHRASE
            }
        }
        const KEY_PAIR = crypto.generateKeyPairSync('rsa', KEY_PAIR_OPTIONS)
        // [ Store keys files ]
        fs.writeFileSync(path.resolve(`../../security/${data.public_name??'public.pem'}`), KEY_PAIR.publickKey)
        fs.writeFileSync(path.resolve(`../../security/${data.private_name??'private.pem'}`), KEY_PAIR.privateKey)
        // [ Return keys in String ]
        resolve({
          public: KEY_PAIR.publickKey,
          private: KEY_PAIR.privateKey,
        })
      }catch(e){
        serviceConfig.logger.setError(e.message,e);
        reject(e.message)
      }
    })
  }

  async encryptInfo(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      try{
        const RSA_PUK = fs.readFileSync(path.resolve(`${__dirname}../../../security/public.pem`),'utf8').toString()
        const encMsg = crypto.publicEncrypt(RSA_PUK, Buffer.from(JSON.stringify({data})))
        const encMsgB64 = encMsg.toString('base64')
        resolve(encMsgB64)
      }catch(e){
        serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }
    })
  }

  async decrypInfo(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      const RSA_PRK = fs.readFileSync(path.resolve(`${__dirname}../../../security/private.pem`),'utf8').toString()
      try{
        const PRK_OBJ = {
            key: RSA_PRK,
            passphrase: process.env.PASSPHRASE!
        };
        const decMsg = crypto.privateDecrypt(PRK_OBJ, Buffer.from(data.token, 'base64'))
        const decMsgUtf8 = decMsg.toString('utf8')
        resolve(JSON.parse(decMsgUtf8))
      }catch(e){
        serviceConfig.logger.setError(e.message,e)
        reject(e.message)
      }
    })
  }
}