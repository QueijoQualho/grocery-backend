import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorator/public.decorator';
import { Role } from './enum/role.enum';
import { UserRequest } from '../auth/payload/userRequest';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Usuário')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuários retornada com sucesso',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'ID do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return user;
  }

  @Patch()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro ao atualizar o usuário',
  })
  async update(@Req() req: UserRequest, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    return await this.userService.update(+userId, updateUserDto);
  }

  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário removido com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro ao remover o usuário',
  })
  async remove(@Req() req: UserRequest) {
    const userId = req.user.sub;
    return await this.userService.remove(+userId);
  }

  @Get('favorites')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de favoritos do usuário retornada com sucesso',
  })
  async getFavorites(@Req() req: UserRequest) {
    const userId = req.user.sub;
    return this.userService.getUserFavorites(+userId);
  }

  @Post('favorites')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produto adicionado aos favoritos com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro ao adicionar produto aos favoritos',
  })
  async addToFavorite(
    @Req() req: UserRequest,
    @Query('productId') productId: string,
  ) {
    const userId = req.user.sub;

    if (!productId)
      throw new BadRequestException('O ID do produto não foi enviado');

    return await this.userService.addToFavorites(+userId, +productId);
  }
}
