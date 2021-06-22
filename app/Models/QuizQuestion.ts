import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm';

import Quiz from './Quiz';

export default class QuizQuestion extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @beforeCreate()
  public static async createUUID(model: QuizQuestion) {
    model.id = uuid();
  }

  @column()
  public question: string;

  @column()
  public options: string;

  @column()
  public correctOption: string;

  @column()
  public imagePath: string;

  @column()
  public quizId: string;

  @belongsTo(() => Quiz)
  public quiz: BelongsTo<typeof Quiz>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
