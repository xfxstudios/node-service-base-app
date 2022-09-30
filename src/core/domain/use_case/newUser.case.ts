import {ValidDtoParams} from "../../infrastructure/decorators/appDecorators";
import {NewUserDTO} from "../dto/newUserDTO";

export class NewUserCase {

  @ValidDtoParams()
  async execute(data:NewUserDTO){
    return {
      error: false,
      data: data.serialize()
    }
  }

}