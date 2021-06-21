import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Quizzes extends BaseSchema {
  protected tableName = 'quizzes';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.uuid('id').primary();
      table.string('name').unique().notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
