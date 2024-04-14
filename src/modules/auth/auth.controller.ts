import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singup.dto';
import { HashPipe } from '../../resources/pipes/hash.pipe';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/modules/auth/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('singup')
  async create(
    @Body() SignUpDTO: SignUpDto,
    @Body('password', HashPipe) password_hash: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = SignUpDTO;

    return await this.authService.singUp({
      ...userData,
      password: password_hash,
    });
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);

    return {
      token,
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
