import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'order_products' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'selling_price', nullable: false })
  sellingPrice: number;

  @ManyToOne(() => OrderEntity, (p) => p.orderProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (p) => p.orderProducts, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
