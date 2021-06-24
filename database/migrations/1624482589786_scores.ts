import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Scores extends BaseSchema {
  protected tableName = 'scores';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.uuid('id').primary();
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .uuid('quiz_id')
        .unsigned()
        .references('id')
        .inTable('quizzes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('score');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
