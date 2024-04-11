import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly productService: ProductService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.favorites = [];

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

    return checkEmail;
  }

  async addToFavorites(userId: number, productId: number) {
    const user = await this.findOne(userId);

    const product = await this.productService.findOne(productId);

    if (!user.favorites) {
      user.favorites = [];
    }

    if (!user.favorites.some((favorite) => favorite.id === productId)) {
      user.favorites.push(product);
      await this.userRepository.save(user);
    }

    return { message: 'Produto adicionado aos favoritos com sucesso' };
  }

  async getUserFavorites(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return user.favorites;
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
