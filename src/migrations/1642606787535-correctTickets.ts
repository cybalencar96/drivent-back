import { MigrationInterface, QueryRunner } from "typeorm";

export class correctTickets1642606787535 implements MigrationInterface {
    name = "correctTickets1642606787535"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"paymentDate\" DROP NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"paymentDate\" SET NOT NULL");
    }
}
