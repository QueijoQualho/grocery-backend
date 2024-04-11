import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Query('userId') userId: string, @Body() data: CreateOrderDto) {
    const res = await this.orderService.create(+userId, data);
    return res;
  }

  @Get()
  async find(@Query('userId') userId: string) {
    const orders = await this.orderService.find(+userId);
    return orders;
  }

  @Patch(':id')
  update(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+orderId, updateOrderDto);
  }
}
