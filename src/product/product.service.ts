import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const userEntity = new ProductEntity();
    Object.assign(userEntity, createProductDto);
    return await this.productRepository.save(userEntity);
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(id: number) {
    const products = await this.productRepository.findOneBy({ id });

    if (!products) throw new Error('Product não foi encontrado');

    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return;
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
