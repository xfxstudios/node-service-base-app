import {repositoryConfig} from "../../infrastructure/config/repository.config";

export class GetUserListCase {

  async execute(){
    const _list = await repositoryConfig.userRepository.getUserList();
    return {
      error: false,
      data: _list
    }
  }

}