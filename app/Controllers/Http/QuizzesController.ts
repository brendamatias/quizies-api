import Quiz from 'App/Models/Quiz';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class QuizzesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 20 } = request.qs();

    const quizzes = await Quiz.query().paginate(page, limit);

    return quizzes;
  }
}
