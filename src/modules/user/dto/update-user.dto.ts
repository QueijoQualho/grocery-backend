import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Nome de usuário (opcional)',
    example: 'john_doe',
  })
  username?: string;

  @ApiProperty({
    description: 'Endereço de e-mail (opcional)',
    example: 'user@example.com',
  })
  email?: string;

  @ApiProperty({ description: 'Senha (opcional)', example: 'nova_senha123' })
  password?: string;

  @ApiProperty({
    description: 'Número de telefone (opcional)',
    example: '+55 (12) 3456-7890',
  })
  phone?: string;

  @ApiProperty({ description: 'Estado (opcional)', example: 'São Paulo' })
  state?: string;

  @ApiProperty({
    description: 'Cidade (opcional)',
    example: 'São José dos Campos',
  })
  city?: string;
}
