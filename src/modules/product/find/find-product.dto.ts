import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindProductDTO {
  @IsNotEmpty()
  @IsUUID()
    id: string;

  constructor(args: FindProductDTO) {
    Object.assign(this, args);
  }
}