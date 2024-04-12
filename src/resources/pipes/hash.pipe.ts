import { PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

export class HashPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: string) {
    const saltRoundsStr = this.configService.get<string>('SALT_HASH');
    const saltRounds = parseInt(saltRoundsStr, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
