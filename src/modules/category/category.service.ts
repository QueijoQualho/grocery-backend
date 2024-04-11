import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryEntity = new CategoryEntity();

    Object.assign(categoryEntity, createCategoryDto);

    return this.categoryRepository.save(categoryEntity);
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findOne({ where: { name } });

    return category;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException('Esta categoria não existe!');
  }
}
