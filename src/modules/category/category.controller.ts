import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Role } from '../user/enum/role.enum';
import { Public, Roles } from '../auth/decorator/public.decorator';
import { UserRequest } from '../auth/payload/userRequest';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @Post()
  create(
    @Req() req: UserRequest,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
