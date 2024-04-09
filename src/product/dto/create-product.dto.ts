import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../product.entity';
import { Type } from 'class-transformer';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export class ImageProductDto {
  id: number;

  @IsUrl({}, { message: 'URL para imagem produto inválida' })
  @IsNotEmpty({ message: 'URL não pode estar vazia' })
  url: string;

  product: ProductEntity;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Quantidade não pode estar vazia' })
  amount: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'Preço não pode estar vazio' })
  price: number;

  @IsInt()
  @IsNotEmpty({ message: 'Quantidade disponível não pode estar vazia' })
  availableQuantity: number;

  @IsString()
  @IsNotEmpty({ message: 'Detalhes do produto não podem estar vazios' })
  productDetail: string;

  @IsString()
  @IsNotEmpty({ message: 'Marca não pode estar vazia' })
  brand: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'Pelo menos uma imagem é necessária' })
  @Type(() => ImageProductDto)
  images: ImageProductDto[];

  @ValidateNested()
  @IsNotEmpty({ message: 'Categoria não pode estar vazia' })
  category: CreateCategoryDto;
}
