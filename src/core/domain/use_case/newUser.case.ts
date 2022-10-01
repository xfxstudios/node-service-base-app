import {repositoryConfig} from "../../infrastructure/config/repository.config";
import {ValidDtoParams} from "../../infrastructure/decorators/appDecorators";
import {NewUserDTO} from "../dto/newUserDTO";

export class NewUserCase {

  @ValidDtoParams()
  async execute(data:NewUserDTO){
    const _process = await repositoryConfig.userRepository.saveUser(data)
    
    return {
      error: false,
      data: _process
    }
  }

}