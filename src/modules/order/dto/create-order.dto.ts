import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

class OrderProductDTO {
  @ApiProperty({ description: 'ID do produto', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Quantidade do produto', example: 5 })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Lista de produtos do pedido',
    type: [OrderProductDTO],
    example: [{ productId: 1, quantity: 5 }],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderProductDTO)
  products: OrderProductDTO[];
}
