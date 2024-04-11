import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UniqueEmailValidator } from '../decorator/unique-email.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio' })
  username: string;

  @IsEmail({}, { message: 'O endereço de e-mail fornecido é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @UniqueEmailValidator({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'O estado não pode estar vazio' })
  state: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade não pode estar vazia' })
  city: string;
}
