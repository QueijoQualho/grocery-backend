import { ProductEntity } from '../product/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 150, nullable: false, unique: true })
  name: string;

  @Column({ name: 'image', length: 255, nullable: false })
  image: string;

  @OneToMany(() => ProductEntity, (p) => p.category, {
    cascade: true,
    eager: true,
  })
  products: ProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
