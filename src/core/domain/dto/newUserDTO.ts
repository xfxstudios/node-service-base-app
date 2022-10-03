import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { HashPassword } from '../../infrastructure/decorators/appDecorators'

export class NewUserDTO {
  @IsNotEmpty()
  @IsString()
  private readonly nombre: String

  @IsNotEmpty()
  @IsString()
  private readonly apellido: String

  @IsNotEmpty()
  @IsString()
  private readonly cedula: String

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  private readonly email: String

  @IsString()
  @IsNotEmpty()
  @HashPassword()
  private readonly password: String

  constructor (data: any) {
    this.nombre = data.nombre
    this.apellido = data.apellido
    this.cedula = data.cedula
    this.email = data.email
    this.password = data.password
  }

  getNombre (): String {
    return this.nombre
  }

  getApellido (): String {
    return this.apellido
  }

  getCedula (): String {
    return this.cedula
  }

  getEmail (): String {
    return this.email
  }

  getPassword (): String {
    return this.password
  }

  serialize (): any {
    return {
      nombre: this.getNombre(),
      apellido: this.getApellido(),
      cedula: this.getCedula(),
      email: this.getEmail(),
      password: this.getPassword()
    } as any
  }
}
