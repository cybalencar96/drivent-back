import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigracao1643487469011 implements MigrationInterface {
    name = "NomeDaMigracao1643487469011"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"events\" DROP CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\"");
      await queryRunner.query("ALTER TABLE \"events\" DROP CONSTRAINT \"REL_55ad94f5c1b4c97960d6d7dc11\"");
      await queryRunner.query("ALTER TABLE \"events\" ADD CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"events\" DROP CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\"");
      await queryRunner.query("ALTER TABLE \"events\" ADD CONSTRAINT \"REL_55ad94f5c1b4c97960d6d7dc11\" UNIQUE (\"locationId\")");
      await queryRunner.query("ALTER TABLE \"events\" ADD CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
