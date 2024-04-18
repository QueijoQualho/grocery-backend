import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'usuario@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  readonly email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'senha123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
