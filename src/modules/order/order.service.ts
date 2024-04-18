import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderProductEntity } from './order-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async findUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não foi encontrado');
    return user;
  }

  private handleData(
    createOrderDto: CreateOrderDto,
    products: ProductEntity[],
  ) {
    createOrderDto.products.forEach((value) => {
      const product = products.find((item) => item.id === value.productId);

      if (!product)
        throw new NotFoundException(
          `Produto com id ${value.productId} não foi encontrado`,
        );

      if (value.quantity > product.availableQuantity) {
        throw new BadRequestException(
          `Quantidade solicitada: ${value.quantity}. É maior que a disponível: ${product.availableQuantity}. `,
        );
      }
    });
  }

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.findUser(userId);

    const productIds = createOrderDto.products.map((item) => item.productId);

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    const orderEntity = new OrderEntity();

    orderEntity.user = user;

    this.handleData(createOrderDto, products);

    const orderProducts = createOrderDto.products.map((item) => {
      const product = products.find((p) => p.id == item.productId);

      const orderProductsEntity = new OrderProductEntity();

      orderProductsEntity.product = product;
      orderProductsEntity.sellingPrice = +product.price;

      orderProductsEntity.quantity = item.quantity;
      orderProductsEntity.product.availableQuantity -= item.quantity;
      return orderProductsEntity;
    });

    const totalValue = orderProducts.reduce((total, item) => {
      return total + item.sellingPrice * item.quantity;
    }, 0);

    orderEntity.orderProducts = orderProducts;
    orderEntity.totalValue = totalValue;

    const savedOrder = await this.orderRepository.save(orderEntity);
    return savedOrder;
  }

  async find(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('O usuário não foi encontrado.');

    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true, orderProducts: true },
    });

    if (!order) throw new NotFoundException('O pedido não foi encontrado.');

    if (order.user.id !== userId) {
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse pedido',
      );
    }

    const orderProductsToUpdate = order.orderProducts;

    for (const updatedProduct of updateOrderDto.products) {
      const orderProduct = orderProductsToUpdate.find(
        (op) => op.product.id === updatedProduct.productId,
      );

      if (!orderProduct) {
        throw new NotFoundException(
          `Produto com id ${updatedProduct.productId} não foi encontrado no pedido.`,
        );
      }

      const product = await this.productRepository.findOne({
        where: { id: updatedProduct.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Produto com id ${updatedProduct.productId} não foi encontrado.`,
        );
      }

      const previousQuantity = orderProduct.quantity;
      const newQuantity = updatedProduct.quantity;

      const quantityDifference = newQuantity - previousQuantity;

      if (quantityDifference > product.availableQuantity) {
        throw new BadRequestException(
          `A quantidade solicitada do produto com id ${product.id} é maior do que a quantidade disponível (${product.availableQuantity}).`,
        );
      }

      orderProduct.quantity = newQuantity;
      product.availableQuantity += quantityDifference;

      await this.productRepository.save(product);
    }

    const updatedOrder = await this.orderRepository.save(order);

    return updatedOrder;
  }
}
