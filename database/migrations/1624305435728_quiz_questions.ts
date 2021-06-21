import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class QuizQuestions extends BaseSchema {
  protected tableName = 'quiz_questions';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.uuid('id').primary();
      table.string('question').unique().notNullable();
      table
        .uuid('quiz_id')
        .unsigned()
        .references('id')
        .inTable('quizzes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.json('options').notNullable();
      table.string('image_path');
      table.string('correct_option').notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
