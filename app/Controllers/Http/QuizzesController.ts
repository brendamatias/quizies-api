import Quiz from 'App/Models/Quiz';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class QuizzesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 20 } = request.qs();

    const quizzes = await Quiz.query()
      .select(['id', 'name'])
      .withCount('quizQuestions')
      .paginate(page, limit);

    const { perPage, currentPage, firstPage, total, lastPage, rows } = quizzes;

    const data = rows.map(quiz => {
      const currentQuiz = quiz.toJSON();
      currentQuiz.questions = quiz.$extras.quizQuestions_count;
      return currentQuiz;
    });

    return {
      pagination: {
        perPage,
        currentPage,
        firstPage,
        total,
        lastPage,
      },
      data,
    };
  }
}
