import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import {
  BaseModel,
  column,
  beforeCreate,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';

import QuizQuestion from './QuizQuestion';

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @beforeCreate()
  public static async createUUID(model: Quiz) {
    model.id = uuid();
  }

  @column()
  public name: string;

  @hasMany(() => QuizQuestion)
  public quizQuestions: HasMany<typeof QuizQuestion>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
