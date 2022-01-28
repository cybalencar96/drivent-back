import { MigrationInterface, QueryRunner } from "typeorm";

export class events1643304532145 implements MigrationInterface {
    name = "events1643304532145"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"events\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"startDate\" TIMESTAMP NOT NULL, \"endDate\" TIMESTAMP NOT NULL, CONSTRAINT \"PK_40731c7151fe4be3116e45ddf73\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"users_events\" (\"userId\" integer NOT NULL, \"eventId\" integer NOT NULL, CONSTRAINT \"PK_ad87142aeec2eca86fdd2caf388\" PRIMARY KEY (\"userId\", \"eventId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_c371d3d447bb0dfd99409808f9\" ON \"users_events\" (\"userId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_4bd0c9767e9a5815aac88bcee1\" ON \"users_events\" (\"eventId\") ");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ALTER COLUMN \"hotelId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"users_events\" ADD CONSTRAINT \"FK_c371d3d447bb0dfd99409808f98\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"users_events\" ADD CONSTRAINT \"FK_4bd0c9767e9a5815aac88bcee1d\" FOREIGN KEY (\"eventId\") REFERENCES \"events\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_events\" DROP CONSTRAINT \"FK_4bd0c9767e9a5815aac88bcee1d\"");
      await queryRunner.query("ALTER TABLE \"users_events\" DROP CONSTRAINT \"FK_c371d3d447bb0dfd99409808f98\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ALTER COLUMN \"hotelId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP INDEX \"IDX_4bd0c9767e9a5815aac88bcee1\"");
      await queryRunner.query("DROP INDEX \"IDX_c371d3d447bb0dfd99409808f9\"");
      await queryRunner.query("DROP TABLE \"users_events\"");
      await queryRunner.query("DROP TABLE \"events\"");
    }
}
