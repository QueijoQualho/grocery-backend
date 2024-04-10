import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmailValidator } from '../decorator/unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  username: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @UniqueEmailValidator({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
