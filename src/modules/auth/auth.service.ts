import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/singup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async singUp(singUpDTO: SignUpDto) {
    const { username, email, password, phone, state, city } = singUpDTO;

    const hashPassword = await bcrypt.hash(password, 10);

    this.userService.create({
      username,
      email,
      password: hashPassword,
      phone,
      state,
      city,
    });
  }

  async login(loginDTO: LoginDto) {
    const { email, password } = loginDTO;

    const user = await this.userService.find(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
