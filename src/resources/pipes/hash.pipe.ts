import { PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import 'dotenv';

export class HashPipe implements PipeTransform {
  constructor() {}

  async transform(password: string) {
    const saltRoundsStr = process.env.SALT_HASH;
    const saltRounds = parseInt(saltRoundsStr, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
