import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaFavoritos1712838620664 implements MigrationInterface {
  name = 'CriaFavoritos1712838620664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites" ("usersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_efe354fb30624c9ea370e58bdf7" PRIMARY KEY ("usersId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a4fcc97c7721be9ac5602c3f4f" ON "favorites" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2360a83d68b9a2ca1c64334a0" ON "favorites" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_a4fcc97c7721be9ac5602c3f4f8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_d2360a83d68b9a2ca1c64334a0a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_d2360a83d68b9a2ca1c64334a0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_a4fcc97c7721be9ac5602c3f4f8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2360a83d68b9a2ca1c64334a0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a4fcc97c7721be9ac5602c3f4f"`,
    );
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
}
