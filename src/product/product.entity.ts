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
import { ProdutoImagemEntity } from './product-image.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', length: 150, nullable: false })
  name: string;

  @Column({ name: 'amount', length: 50, nullable: false })
  amount: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'product_detail', length: 150, nullable: false })
  productDetail: string;

  @OneToMany(() => ProdutoImagemEntity, (p) => p.product, {
    cascade: true,
    eager: true,
  })
  images: ProdutoImagemEntity[];

  @ManyToOne(() => CategoryEntity, (c) => c.products, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: CategoryEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
