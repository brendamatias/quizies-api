import CustomException from 'App/Exceptions/CustomException';
import CreateQuestions from 'App/Services/CreateQuestions';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class QuizQuestionsController {
  public async show({ request }: HttpContextContract) {
    const { quiz_id } = request.params();
    const questions = await Database.from('quiz_questions')
      .select()
      .where('quiz_id', quiz_id);

    return questions;
  }

  public async store({ auth, request }: HttpContextContract) {
    if (auth.user?.email !== 'brendamatias.sobral@gmail.com') {
      throw new CustomException(
        'Usuário não autorizado',
        401,
        'E_UNAUTHORIZED_ACCESS',
      );
    }

    const file = request.file('questions');

    if (!file) {
      throw new CustomException('Arquivo é obrigatório', 400, 'MISSING_FILES');
    }

    const errors = await CreateQuestions(file);

    return { errors };
  }
}
