import { repositoryConfig } from '../../infrastructure/config/repository.config';

export class GetUserInfoCase {

  async execute(id:any){
    const _info = await repositoryConfig.userRepository.getUserInfo(id);
    return {
      error: false,
      data: _info
    }
  }

}