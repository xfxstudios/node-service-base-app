import { controllerConfig } from './controllers.config'
import { serviceConfig } from './services.config'
import { repositoryConfig } from './repository.config'

// [SERVICES]
const services = { ...serviceConfig }

// [CONTROLLERS]
const controllers = { ...controllerConfig }

// [REPOSITORIES]
const repositories = { ...repositoryConfig }

export const appConfig = {
  services,
  controllers,
  repositories
}
