import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { UniqueNameCategoryValidator } from '../decorator/unique-name-category.validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'O nome da categoria',
    example: 'Eletrônicos',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @UniqueNameCategoryValidator({ message: 'Essa categoria já existe!' })
  name: string;

  @ApiProperty({
    description: 'A URL da imagem da categoria',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl({}, { message: 'URL para imagem produto inválida' })
  @IsNotEmpty({ message: 'A url para imagem é obrigatoria' })
  image: string;
}
