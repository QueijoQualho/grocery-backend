import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UniqueEmailValidator } from '../decorator/unique-email.validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome de usuário', example: 'john_doe' })
  @IsString()
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio' })
  username: string;

  @ApiProperty({
    description: 'Endereço de e-mail',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'O endereço de e-mail fornecido é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @UniqueEmailValidator({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @ApiProperty({ description: 'Senha', example: 'senha123' })
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Número de telefone',
    example: '+55 (12) 3456-7890',
  })
  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  phone: string;

  @ApiProperty({ description: 'Estado', example: 'São Paulo' })
  @IsString()
  @IsNotEmpty({ message: 'O estado não pode estar vazio' })
  state: string;

  @ApiProperty({ description: 'Cidade', example: 'São José dos Campos' })
  @IsString()
  @IsNotEmpty({ message: 'A cidade não pode estar vazia' })
  city: string;
}
