import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteProductDTO {
  @IsNotEmpty()
  @IsUUID()
    id: string;

  constructor(args: DeleteProductDTO) {
    Object.assign(this, args);
  }
}