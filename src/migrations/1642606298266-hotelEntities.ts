import { MigrationInterface, QueryRunner } from "typeorm";

export class hotelEntities1642606298266 implements MigrationInterface {
    name = "hotelEntities1642606298266"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_76b20e23154532d6fc4a0f0ea27\"");
      await queryRunner.query("ALTER TABLE \"rooms\" RENAME COLUMN \"roomTypeId\" TO \"typeId\"");
      await queryRunner.query("ALTER TABLE \"ticket_types\" ALTER COLUMN \"hotelPrice\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_c2d532ef188a71429c125cdc83c\" FOREIGN KEY (\"typeId\") REFERENCES \"room_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_c2d532ef188a71429c125cdc83c\"");
      await queryRunner.query("ALTER TABLE \"ticket_types\" ALTER COLUMN \"hotelPrice\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" RENAME COLUMN \"typeId\" TO \"roomTypeId\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_76b20e23154532d6fc4a0f0ea27\" FOREIGN KEY (\"roomTypeId\") REFERENCES \"room_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
