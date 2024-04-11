import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1712805062232 implements MigrationInterface {
  name = 'Test1712805062232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_value"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "total_value" numeric(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_value"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "total_value" integer NOT NULL`,
    );
  }
}
