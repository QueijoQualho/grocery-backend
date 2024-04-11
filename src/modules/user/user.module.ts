import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UniqueEmail } from './decorator/unique-email.validator';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ProductModule],
  controllers: [UserController],
  providers: [UserService, UniqueEmail],
  exports: [UserService],
})
export class UserModule {}
