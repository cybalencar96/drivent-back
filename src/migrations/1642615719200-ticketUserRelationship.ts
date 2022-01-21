import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketUserRelationship1642615719200 implements MigrationInterface {
    name = "ticketUserRelationship1642615719200"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"userId\" integer");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_4bb45e096f521845765f657f5c8\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"userId\"");
    }
}
