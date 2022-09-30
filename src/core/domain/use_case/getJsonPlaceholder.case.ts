import {repositoryConfig} from "../../infrastructure/config/repository.config";

export class GetJsonPlaceholderCase {

  async execute(){
    const _response = await repositoryConfig.appRepository.getJsonPlaceholder();

    return {
      error: false,
      requesData: {},
      data: _response
    }
  }

}