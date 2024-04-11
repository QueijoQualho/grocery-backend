import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'username', length: 100, nullable: false })
  username: string;

  @Column({ name: 'email', length: 70, nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'phone', length: 20, nullable: false })
  phone: string;

  @Column({ name: 'state', length: 100, nullable: false })
  state: string;

  @Column({ name: 'city', length: 100, nullable: false })
  city: string;

  @ManyToMany(() => ProductEntity, { eager: true })
  @JoinTable({ name: 'favorites' })
  favorites?: ProductEntity[];

  @OneToMany(() => OrderEntity, (p) => p.user)
  orders: OrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
