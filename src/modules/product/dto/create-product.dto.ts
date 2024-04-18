import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductEntity } from '../product.entity';

export class ImageProductDto {
  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl({}, { message: 'URL para imagem produto inválida' })
  @IsNotEmpty({ message: 'URL não pode estar vazia' })
  url: string;

  @ApiProperty({ description: 'O produto relacionado' })
  product: ProductEntity;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Camiseta',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name: string;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: '10 unidades',
  })
  @IsString()
  @IsNotEmpty({ message: 'Quantidade não pode estar vazia' })
  amount: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 19.99,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Preço não pode estar vazio' })
  price: number;

  @ApiProperty({
    description: 'Quantidade disponível do produto',
    example: 100,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Quantidade disponível não pode estar vazia' })
  availableQuantity: number;

  @ApiProperty({
    description: 'Detalhes do produto',
    example: 'Camiseta branca de algodão',
  })
  @IsString()
  @IsNotEmpty({ message: 'Detalhes do produto não podem estar vazios' })
  productDetail: string;

  @ApiProperty({
    description: 'Marca do produto',
    example: 'Marca X',
  })
  @IsString()
  @IsNotEmpty({ message: 'Marca não pode estar vazia' })
  brand: string;

  @ApiProperty({
    isArray: true,
    description: 'Imagens do produto',
    example: [{ url: 'https://example.com/image1.jpg', product: {} }],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'Pelo menos uma imagem é necessária' })
  @Type(() => ImageProductDto)
  images: ImageProductDto[];

  @ApiProperty({
    description: 'ID da categoria do produto',
    example: 1,
  })
  @IsInt()
  categoryId: number;
}
