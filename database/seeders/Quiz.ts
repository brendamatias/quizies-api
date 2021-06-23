import Quiz from 'App/Models/Quiz';

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class QuizSeeder extends BaseSeeder {
  public async run() {
    const quizzes = [
      'Greys Anatomy',
      'Modern Family',
      'Friends',
      'How I Meet Your Mother',
      'Stranger Things',
      'Riverdale',
      'Sex Education',
      'Pretty Little Liars',
    ];

    await Promise.all(
      quizzes.map(async quiz => {
        const quizExists = await Quiz.findBy('name', quiz);

        if (!quizExists) {
          await Quiz.create({ name: quiz });
        }
      }),
    );
  }
}
