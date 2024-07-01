import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { CategoryType } from '../create/create-product.dto';

export class ParamsUpdateProductDTO {
  @IsNotEmpty()
  @IsUUID()
    id: string;

  constructor(args: ParamsUpdateProductDTO) {
    Object.assign(this, args);
  }
}

export class BodyUpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
    name?: string;

  @IsNotEmpty({message: 'Insert value in cents!'})
  @IsNumber()
  @IsOptional()
    amount?: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
    code?: string;

  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
    description?: string;

  @Matches(RegExp('^[0-9]+$'))
  @IsNotEmpty()
  @IsString()
  @IsOptional()
    quantity?: string;

  @IsEnum(CategoryType, {message: 'Available categories: ELECTRONICS | CLOTHES'})
  @IsNotEmpty()
  @IsString()
  @IsOptional()
    category?: string;

  
  constructor(args: BodyUpdateProductDTO){
    Object.assign(this, args);
  }
}