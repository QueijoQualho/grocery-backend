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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorator/public.decorator';
import { Role } from './enum/role.enum';
import { UserRequest } from '../auth/payload/userRequest';

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

  @Post('favorites')
  async addToFavorite(
    @Req() req: UserRequest,
    @Query('productId') productId: string,
  ) {
    const userId = req.user.sub;
    return await this.userService.addToFavorites(+userId, +productId);
  }

  @Get('favorites')
  async getFavorites(@Req() req: UserRequest) {
    const userId = req.user.sub;
    return this.userService.getUserFavorites(+userId);
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

  @Patch()
  async update(@Req() req: UserRequest, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    return await this.userService.update(+userId, updateUserDto);
  }

  @Delete()
  async remove(@Req() req: UserRequest) {
    const userId = req.user.sub;
    return await this.userService.remove(+userId);
  }
}
