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

    let categoryData = null;
    if (createProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        createProductDto.categoryId,
      );
      productEntity.category = category;
      categoryData = {
        name: category.name,
        image: category.image,
      };
    }

    await this.productRepository.save(productEntity);

    const responseData: ProductResponseDto = {
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price,
      availableQuantity: productEntity.availableQuantity,
      productDetail: productEntity.productDetail,
      brand: productEntity.brand,
      images: productEntity.images.map((image) => ({
        id: image.id,
        url: image.url,
      })),
      category: categoryData,
    };

    return responseData;
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(id: number) {
    const products = await this.productRepository.findOneBy({ id });

    if (!products) throw new NotFoundException('Produto não foi encontrado');

    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException('Produto nao encontrado');

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Produto de ID "${id}" não foi encontrado`);
    }
  }
}
