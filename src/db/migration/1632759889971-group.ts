import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class group1632759889971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "groups",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isUnique: true,
          generationStrategy: "uuid",
        },
        { name: "name", type: "varchar", isUnique: true, length: "255" },
        { name: "permissions", type: "varchar", isArray: true },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("groups");
  }
}
