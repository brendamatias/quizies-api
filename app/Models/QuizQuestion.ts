import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm';

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
  public correct_option: string;

  @column()
  public image_path: string;

  @column()
  public quiz_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
