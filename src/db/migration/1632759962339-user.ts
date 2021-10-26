import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class user1632759962339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isUnique: true,
          generationStrategy: "uuid",
        },
        { name: "login", type: "varchar", isUnique: true, length: "255" },
        { name: "password", type: "varchar", length: "255" },
        { name: "age", type: "integer" },
        { name: "isDeleted", type: "boolean" },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
