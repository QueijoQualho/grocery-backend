import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'Lista de produtos do pedido (opcional)',
    example: [{ productId: 1, quantity: 5 }],
  })
  products?: { productId: number; quantity: number }[];
}
