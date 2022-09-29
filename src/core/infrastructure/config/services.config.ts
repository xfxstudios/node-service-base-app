import SmartLogger from 'node_smart_logger'
import { AxiosService } from '../services/request_service/axios.service'
import { FetchService } from '../services/request_service/fetch.service'
import { ValidateService } from '../services/validate_service/validate.service'

const logger = new SmartLogger()
// const requestService = new AxiosService();
const requestService = new FetchService()
const validateService = new ValidateService()

export const serviceConfig = {
  logger,
  requestService,
  validateService
}
