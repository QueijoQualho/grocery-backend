import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userEntity = new UserEntity();

    Object.assign(userEntity, createUserDto);

    return this.userRepository.save(userEntity);
  }

  async find(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll() {
    const userList = await this.userRepository.find();

    return userList;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('O Usuario não foi encontrado.');

    return user;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOneBy({ email });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (!result.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }
}
