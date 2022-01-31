import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigracao1643400657725 implements MigrationInterface {
    name = "NomeDaMigracao1643400657725"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"enrollments\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"cpf\" character varying NOT NULL, \"birthday\" character varying NOT NULL, \"phone\" character varying NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"UQ_409b735ec0a7fcc6c1a0dab2da2\" UNIQUE (\"cpf\"), CONSTRAINT \"PK_7c0f752f9fb68bf6ed7367ab00f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"addresses\" (\"id\" SERIAL NOT NULL, \"cep\" character varying NOT NULL, \"street\" character varying NOT NULL, \"city\" character varying NOT NULL, \"number\" character varying NOT NULL, \"state\" character varying NOT NULL, \"neighborhood\" character varying NOT NULL, \"addressDetail\" character varying, \"enrollmentId\" integer NOT NULL, CONSTRAINT \"REL_1ce5592b8fd5529a35fb9fe146\" UNIQUE (\"enrollmentId\"), CONSTRAINT \"PK_745d8f43d3af10ab8247465e450\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"locations\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_7cc1c9e3853b94816c094825e74\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"events\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"startDate\" TIMESTAMP NOT NULL, \"endDate\" TIMESTAMP NOT NULL, \"vacancies\" integer NOT NULL, \"locationId\" integer, CONSTRAINT \"REL_55ad94f5c1b4c97960d6d7dc11\" UNIQUE (\"locationId\"), CONSTRAINT \"PK_40731c7151fe4be3116e45ddf73\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"imageUrl\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" integer NOT NULL, \"typeId\" integer, \"hotelId\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"reservations\" (\"id\" SERIAL NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"userId\" integer, \"roomId\" integer, CONSTRAINT \"REL_aa0e1cc2c4f54da32bf8282154\" UNIQUE (\"userId\"), CONSTRAINT \"PK_da95cef71b617ac35dc5bcda243\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"room_types\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_b6e1d0a9b67d4b9fbff9c35ab69\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"sessions\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"token\" character varying NOT NULL, CONSTRAINT \"PK_3238ef96f18b355b671619111bc\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"settings\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"value\" character varying NOT NULL, CONSTRAINT \"UQ_ca7857276d2a30f4dcfa0e42cd4\" UNIQUE (\"name\"), CONSTRAINT \"PK_0669fe20e252eb692bf4d344975\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"ticket_types\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" numeric(8,2) NOT NULL, \"hotelPrice\" numeric(8,2), CONSTRAINT \"PK_5510ce7e18a4edc648c9fbfc283\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"paymentDate\" TIMESTAMP, \"typeId\" integer, \"userId\" integer, CONSTRAINT \"REL_4bb45e096f521845765f657f5c\" UNIQUE (\"userId\"), CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"users_events\" (\"userId\" integer NOT NULL, \"eventId\" integer NOT NULL, CONSTRAINT \"PK_ad87142aeec2eca86fdd2caf388\" PRIMARY KEY (\"userId\", \"eventId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_c371d3d447bb0dfd99409808f9\" ON \"users_events\" (\"userId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_4bd0c9767e9a5815aac88bcee1\" ON \"users_events\" (\"eventId\") ");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"events\" ADD CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_c2d532ef188a71429c125cdc83c\" FOREIGN KEY (\"typeId\") REFERENCES \"room_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\" FOREIGN KEY (\"typeId\") REFERENCES \"ticket_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"users_events\" ADD CONSTRAINT \"FK_c371d3d447bb0dfd99409808f98\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"users_events\" ADD CONSTRAINT \"FK_4bd0c9767e9a5815aac88bcee1d\" FOREIGN KEY (\"eventId\") REFERENCES \"events\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_events\" DROP CONSTRAINT \"FK_4bd0c9767e9a5815aac88bcee1d\"");
      await queryRunner.query("ALTER TABLE \"users_events\" DROP CONSTRAINT \"FK_c371d3d447bb0dfd99409808f98\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_c2d532ef188a71429c125cdc83c\"");
      await queryRunner.query("ALTER TABLE \"events\" DROP CONSTRAINT \"FK_55ad94f5c1b4c97960d6d7dc115\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("DROP INDEX \"IDX_4bd0c9767e9a5815aac88bcee1\"");
      await queryRunner.query("DROP INDEX \"IDX_c371d3d447bb0dfd99409808f9\"");
      await queryRunner.query("DROP TABLE \"users_events\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
      await queryRunner.query("DROP TABLE \"ticket_types\"");
      await queryRunner.query("DROP TABLE \"settings\"");
      await queryRunner.query("DROP TABLE \"sessions\"");
      await queryRunner.query("DROP TABLE \"room_types\"");
      await queryRunner.query("DROP TABLE \"reservations\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"events\"");
      await queryRunner.query("DROP TABLE \"locations\"");
      await queryRunner.query("DROP TABLE \"users\"");
      await queryRunner.query("DROP TABLE \"addresses\"");
      await queryRunner.query("DROP TABLE \"enrollments\"");
    }
}
