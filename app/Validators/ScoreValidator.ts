import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ScoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    quiz_id: schema.string({}, [
      rules.exists({ table: 'quizzes', column: 'id' }),
    ]),
    score: schema.number(),
  });

  public messages = {
    'quiz_id.required': 'Quiz é obrigatório',
    'quiz_id.exists': 'Quiz não encontrado',
    'score.number': 'Score inválido',
    'score.required': 'Score é obrigatório',
  };
}
