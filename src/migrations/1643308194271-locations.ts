import { MigrationInterface, QueryRunner } from "typeorm";

export class locations1643308194271 implements MigrationInterface {
    name = "locations1643308194271"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"locations\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_7cc1c9e3853b94816c094825e74\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"events\" ADD \"locationId\" integer");
      await queryRunner.query("ALTER TABLE \"events\" ADD CONSTRAINT \"UQ_55ad94f5c1b4c97960d6d7dc115\" UNIQUE (\"locationId\")");
      await queryRunner.query("ALTER TABLE \"events\" ADD CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"events\" DROP CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\"");
      await queryRunner.query("ALTER TABLE \"events\" DROP CONSTRAINT \"UQ_55ad94f5c1b4c97960d6d7dc115\"");
      await queryRunner.query("ALTER TABLE \"events\" DROP COLUMN \"locationId\"");
      await queryRunner.query("DROP TABLE \"locations\"");
    }
}
