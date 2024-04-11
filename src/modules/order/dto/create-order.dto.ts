import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class OrderProductDTO {
  @IsNumber()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderProductDTO)
  products: OrderProductDTO[];
}
