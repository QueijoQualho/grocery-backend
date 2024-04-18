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
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Public, Roles } from '../auth/decorator/public.decorator';
import { Role } from '../user/enum/role.enum';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Produto criado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro ao criar o produto.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'brand',
    required: false,
    type: String,
  })
  @UseInterceptors(CacheInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produtos encontrados com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro ao encontrar os produtos.',
  })
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto encontrado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produto não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto atualizado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produto não encontrado.',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto removido com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produto não encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
