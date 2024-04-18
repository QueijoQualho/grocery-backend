import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Public, Roles } from '../auth/decorator/public.decorator';
import { Role } from '../user/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  /*   @Public()
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.productService.findAll();
  } */

  @Public()
  @Get()
  @UseInterceptors(CacheInterceptor)
  searchProduct(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('brand') brand?: string,
  ) {
    return this.productService.searchProduct(search, category, brand);
  }

  @Public()
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
