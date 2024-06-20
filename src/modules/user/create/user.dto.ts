import { EqualsTo, PasswordValidation } from '@/utils/functions/password-validation';
import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateNested } from 'class-validator';
import 'reflect-metadata';


class AddressDTO {
  @MinLength(2)
  @IsString()
    country: string;

  @IsString()
    state: string;

  @IsString()
    city: string;

  @IsString()
    zipCode: string;

  @IsString()
    numberAndStreet: string;

  @IsString()
  @IsOptional()
    complement?: string;
}

class PhoneDTO {
  @MinLength(2)
  @IsString()
    countryCode: string;
  
  @MinLength(2)
  @IsString()
    areaCode: string;
  
  @MinLength(8)
  @IsString()
    number: string;
}


export class UserDTO {
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @IsString()
  @PasswordValidation({message: 'The password must contain at least 8 digits with 1 uppercase letter, 1 lowercase letter, 1 number.'})
    password: string;
  
  @IsNotEmpty()
  @IsString()
  @EqualsTo('password')
    passwordConfirmation: string;
  
  @Matches(/^(cpf|cnpj|passport|rg)$/i, {message: 'Possible types doc CPF | CNPJ | PASSPORT | RG'})
  @IsString()
  @IsOptional()
    documentType?: string;
  
  @MinLength(7)
  @Matches(RegExp('^[0-9]+$'))
  @IsString()
  @IsOptional()
    document?: string;
  
  @IsOptional()
    customerType?: string;

  @Matches(/^(male|female)$/i, {message: 'Possible types MALE | FEMALE'})
  @IsString()
  @IsOptional()  
    gender?: string;
  
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  @IsOptional()
    address?: AddressDTO;
  
  @ValidateNested({ each: true })
  @Type(() => PhoneDTO)
  @IsOptional()
    mobilePhone?: PhoneDTO;

  @ValidateNested({ each: true })
  @Type(() => PhoneDTO)
  @IsOptional()
    homePhone?: PhoneDTO;
  
  @IsDateString({
    strict: true,
  })
  @IsOptional()
    birthdate?: string;

  constructor(args: UserDTO) {
    Object.assign(this, args);
  }
}
