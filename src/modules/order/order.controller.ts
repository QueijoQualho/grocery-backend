import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserRequest } from '../auth/payload/userRequest';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Pedidos')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Pedido criado com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Erro ao criar o pedido.',
  })
  async create(@Req() req: UserRequest, @Body() data: CreateOrderDto) {
    const userId = req.user.sub;
    const res = await this.orderService.create(+userId, data);
    return res;
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pedidos encontrados com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Erro ao encontrar os pedidos.',
  })
  async find(@Req() req: UserRequest) {
    const userId = req.user.sub;
    const orders = await this.orderService.find(+userId);
    return orders;
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pedido atualizado com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Erro ao atualizar o pedido.',
  })
  update(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: UserRequest,
  ) {
    const userId = req.user.sub;
    return this.orderService.update(+orderId, updateOrderDto, +userId);
  }
}
