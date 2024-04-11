import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'total_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  totalValue: number;

  @ManyToOne(() => UserEntity, (u) => u.orders)
  user: UserEntity;

  @OneToMany(() => OrderProductEntity, (o) => o.order, {
    cascade: true,
  })
  orderProducts: OrderProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
