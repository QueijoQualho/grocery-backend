import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'O novo nome da categoria',
    example: 'Eletrônicos',
  })
  name?: string;

  @ApiProperty({
    description: 'A nova URL da imagem da categoria',
    example: 'https://example.com/new-image.jpg',
  })
  image?: string;
}
