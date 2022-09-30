import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {HashPassword} from "../../infrastructure/decorators/appDecorators";

export class NewUserDTO{
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  private readonly username:String;
  
  @IsString()
  @IsNotEmpty()
  @HashPassword()
  private readonly password:String;

  constructor(data:any){
    this.username = data.username;
    this.password = data.password;
  }

  getUsername():String {
    return this.username
  }

  getPassword():String {
    return this.password
  }

  serialize():any {
    return {
      username:this.getUsername(), 
      password:this.getPassword(),
    } as any
  }

}