import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Role } from '../user/enum/role.enum';
import { Public, Roles } from '../auth/decorator/public.decorator';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @ApiForbiddenResponse({
    description:
      'Somente usuários com função de administrador podem acessar esta rota.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A categoria foi criada com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Ocorreu um erro ao criar a categoria.',
  })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A lista de categorias foi retornada com sucesso.',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A categoria foi encontrada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A categoria não foi encontrada.',
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({
    description:
      'Somente usuários com função de administrador podem acessar esta rota.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A categoria foi atualizada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A categoria não foi encontrada.',
  })
  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({
    description:
      'Somente usuários com função de administrador podem acessar esta rota.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A categoria foi removida com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A categoria não foi encontrada.',
  })
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
