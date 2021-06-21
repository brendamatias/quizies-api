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
      throw new CustomException(401, 'Usuário não autorizado');
    }

    const file = request.file('questions');

    if (!file) {
      throw new CustomException(400, 'Arquivo é obrigatório');
    }

    const errors = await CreateQuestions(file);

    return { errors };
  }
}
