import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { ProductResponseDto } from './dto/response-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productEntity = new ProductEntity();
    Object.assign(productEntity, createProductDto);

    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    productEntity.category = category;
    await this.productRepository.save(productEntity);

    const response: ProductResponseDto = new ProductResponseDto(
      productEntity.id,
      productEntity.name,
      productEntity.price,
      productEntity.availableQuantity,
      productEntity.productDetail,
      productEntity.brand,
      productEntity.images.map((image) => ({ id: image.id, url: image.url })),
      { name: category.name, image: category.image },
    );

    return response;
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(id: number) {
    const products = await this.productRepository.findOneBy({ id });

    if (!products) throw new NotFoundException('Product não foi encontrado');

    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return;
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Produto de ID "${id}" não foi encontrado`);
    }
  }
}
