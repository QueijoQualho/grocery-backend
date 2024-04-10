import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/singup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async singUp(singUpDTO: SignUpDto) {
    const { username, email, senha } = singUpDTO;

    const hashPassword = await bcrypt.hash(senha, 10);

    this.userService.create({
      username,
      email,
      senha: hashPassword,
    });
  }

  async login(loginDTO: LoginDto) {
    const { email, senha } = loginDTO;

    const user = await this.userService.find(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(senha, user.senha);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
