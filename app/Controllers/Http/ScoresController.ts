import Score from 'App/Models/Score';
import ScoreValidator from 'App/Validators/ScoreValidator';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ScoresController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 20 } = request.qs();

    const ranking = await Database.from('scores')
      .leftJoin('users', 'users.id', '=', 'scores.user_id')
      .select(['users.id', 'users.name', Database.raw('sum(score)')])
      .groupBy('users.id')
      .orderBy(Database.raw('sum(score)'), 'desc')
      .paginate(page, limit);

    return ranking;
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { quiz_id, score } = await request.validate(ScoreValidator);

      const ranking = await Score.create({
        quiz_id,
        score,
        user_id: auth?.user?.id,
      });

      return ranking;
    } catch (error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.badRequest(error.messages);
      }

      throw error;
    }
  }
}
