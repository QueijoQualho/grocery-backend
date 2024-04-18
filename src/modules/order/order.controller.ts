import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserRequest } from '../auth/payload/userRequest';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Req() req: UserRequest, @Body() data: CreateOrderDto) {
    const userId = req.user.sub;
    const res = await this.orderService.create(+userId, data);
    return res;
  }

  @Get()
  async find(@Req() req: UserRequest) {
    const userId = req.user.sub;
    const orders = await this.orderService.find(+userId);
    return orders;
  }

  @Patch(':id')
  update(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: UserRequest,
  ) {
    const userId = req.user.sub;
    return this.orderService.update(+orderId, updateOrderDto, +userId);
  }
}
