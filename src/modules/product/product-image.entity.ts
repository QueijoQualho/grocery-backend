import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_image')
export class ProductImageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @ManyToOne(() => ProductEntity, (p) => p.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;
}
