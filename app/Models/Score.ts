import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm';

export default class Score extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @beforeCreate()
  public static async createUUID(model: Score) {
    model.id = uuid();
  }

  @column()
  public quiz_id: string;

  @column()
  public user_id: string;

  @column()
  public score: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
