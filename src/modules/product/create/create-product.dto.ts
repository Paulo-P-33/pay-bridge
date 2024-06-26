import { IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export enum CategoryType{
  'ELECTRONICS',
  'CLOTHES',
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty({message: 'Insert value in cents!'})
  @IsNumber()
    amount: number;

  @IsNotEmpty()
  @IsString()
    code: string;

  
  @IsNotEmpty()
  @IsString()
    description: string;

  @Matches(RegExp('^[0-9]+$'))
  @IsNotEmpty()
  @IsString()
    quantity: string;

  @IsEnum(CategoryType, {message: 'Available categories: ELECTRONICS | CLOTHES'})
  @IsNotEmpty()
  @IsString()
    category: string;

  
  constructor(args: CreateProductDTO){
    Object.assign(this, args);
  }
}