import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto, ImageProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Nome do produto (opcional)',
    example: 'Nova Camiseta',
  })
  name?: string;

  @ApiProperty({
    description: 'Quantidade do produto (opcional)',
    example: '5 unidades',
  })
  amount?: string;

  @ApiProperty({
    description: 'Preço do produto (opcional)',
    example: 24.99,
  })
  price?: number;

  @ApiProperty({
    description: 'Quantidade disponível do produto (opcional)',
    example: 50,
  })
  availableQuantity?: number;

  @ApiProperty({
    description: 'Detalhes do produto (opcional)',
    example: 'Camiseta preta de algodão',
  })
  productDetail?: string;

  @ApiProperty({
    description: 'Marca do produto (opcional)',
    example: 'Marca Y',
  })
  brand?: string;

  @ApiProperty({
    type: [ImageProductDto],
    isArray: true,
    description: 'Imagens do produto (opcional)',
  })
  images?: ImageProductDto[];

  @ApiProperty({
    description: 'ID da categoria do produto (opcional)',
    example: 2,
  })
  categoryId?: number;
}
