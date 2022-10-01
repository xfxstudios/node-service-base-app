import mongoose, { Model } from 'mongoose';
import {databases} from '../../databases/index.databases';
const { Schema } = mongoose;

const { mongodb } = databases
const { local } = mongodb

interface iTestType {
  nombre: String
  apellido: String
  cedula: String
  email: String
  password: String
}

const testSchema = new Schema<iTestType>({
  nombre: String,
  apellido: String,
  cedula: String,
  email: String,
  password: String
},{
  timestamps: true
})

export const TestModel = local.model('test_users',testSchema)