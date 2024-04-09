import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacaoCategoriaProduto1712621201135
  implements MigrationInterface
{
  name = 'RelacaoCategoriaProduto1712621201135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "brand" character varying(150) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "product_detail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "product_detail" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "product_detail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "product_detail" character varying(150) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
  }
}
