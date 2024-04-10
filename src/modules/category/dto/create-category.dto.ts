import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { UniqueNameCategoryValidator } from '../decorator/unique-name-category.validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @UniqueNameCategoryValidator({ message: 'Essa categoria já existe!' })
  name: string;

  @IsUrl({}, { message: 'URL para imagem produto inválida' })
  @IsNotEmpty({ message: 'A url para imagem é obrigatoria' })
  image: string;
}
