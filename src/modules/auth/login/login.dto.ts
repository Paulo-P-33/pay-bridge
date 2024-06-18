import {IsEmail, IsNotEmpty, IsString} from 'class-validator';


export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
    email: string;

  @IsNotEmpty()
  @IsString()
    password: string; 
  
  constructor(args: LoginDto) {
    Object.assign(this, args);
  }
}

