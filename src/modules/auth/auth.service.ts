import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserPayload } from './payload/user-payload';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await compare(pass, user.password);
      if (isPasswordValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async singUp(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(loginDTO: LoginDto) {
    const user = await this.userService.findByEmail(loginDTO.email);

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    };

    return await this.generateJwtToken(payload);
  }

  async generateJwtToken(payload: UserPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
