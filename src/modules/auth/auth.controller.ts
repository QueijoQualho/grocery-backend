import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashPipe } from '../../resources/pipes/hash.pipe';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/modules/auth/decorator/public.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('singup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Erro ao criar o usuário.',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body('password', HashPipe) password_hash: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = createUserDto;

    return await this.authService.singUp({
      ...userData,
      password: password_hash,
    });
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login bem-sucedido.',
  })
  @ApiBadRequestResponse({
    description: 'Credenciais inválidas.',
  })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);

    return {
      token,
    };
  }

  @ApiBearerAuth()
  @Get('profile')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Perfil do usuário retornado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token de acesso inválido.',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
