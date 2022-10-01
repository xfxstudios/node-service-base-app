import { AppRepository } from '../repository/appRepository'
import {UserRepository} from '../repository/userRepository'

const appRepository = new AppRepository()
const userRepository = new UserRepository()

export const repositoryConfig = {
  appRepository,
  userRepository
}
