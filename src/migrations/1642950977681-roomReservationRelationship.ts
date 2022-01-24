import { MigrationInterface, QueryRunner } from "typeorm";

export class roomReservationRelationship1642950977681 implements MigrationInterface {
    name = "roomReservationRelationship1642950977681"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ALTER COLUMN \"hotelId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"REL_73fa8fb7243b56914e00f8a0b1\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"REL_73fa8fb7243b56914e00f8a0b1\" UNIQUE (\"roomId\")");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ALTER COLUMN \"hotelId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
