import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorator/public.decorator';
import { Role } from './enum/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*   @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body('password', HashPipe) password_hash: string,
  ) {
    const { password, ...userData } = createUserDto;

    return await this.userService.create({
      ...userData,
      password: password_hash,
    });
  } */

  @Roles(Role.User, Role.Admin)
  @Post('favorites')
  async addToFavorite(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ) {
    return await this.userService.addToFavorites(+userId, +productId);
  }

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);

    return user;
  }

  @Get('favorites')
  async addToFavorites(@Query('userId') userId: string) {
    return this.userService.getUserFavorites(+userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
