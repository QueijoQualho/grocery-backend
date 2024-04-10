import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsUrl({}, { message: 'URL para imagem produto inválida' })
  image_url: string;
}
