import CustomException from 'App/Exceptions/CustomException';
import Quiz from 'App/Models/Quiz';
import QuizQuestion from 'App/Models/QuizQuestion';
import xlsx from 'xlsx';

function readFile(file) {
  try {
    const workbook = xlsx.readFile(file.tmpPath);
    const sheetNames = workbook.SheetNames;

    return xlsx.utils.sheet_to_csv(workbook.Sheets[sheetNames[0]]);
  } catch (err) {
    throw new CustomException(400, 'Arquivo corrompido ou ilegível');
  }
}

interface IErrors {
  question: string;
  error: string;
}

function handleFailures(failures) {
  const errors: IErrors[] = [];
  failures.forEach((error, questionData) => {
    const errorData = {
      question: questionData.join(' | '),
      error: error.detail || error,
    };

    errors.push(errorData);
  });

  return errors;
}

export default async file => {
  const questionsData = readFile(file);
  const questions = questionsData.split('\n').slice(1);

  const failures = new Map();

  await Promise.all(
    questions.map(async question => {
      const isEmpty = question.match(/,{7}/);
      if (isEmpty) return;

      const questionData = question.split(',');
      if (questionData.length <= 7) {
        failures.set(questionData, 'A questão possui dados faltantes');
        return;
      }

      try {
        const quiz = await Quiz.findBy('name', questionData[0].trim());

        if (!quiz) {
          failures.set(questionData, 'Quiz não encontrado');
          return;
        }

        const options = [
          questionData[2].trim(),
          questionData[3].trim(),
          questionData[4].trim(),
          questionData[5].trim(),
        ];

        const hasCorrectOption = options.some(
          option => option === questionData[6].trim(),
        );

        if (!hasCorrectOption) {
          failures.set(questionData, 'Alternativa correta inválida');
          return;
        }

        const optionsJSON = JSON.stringify(options);

        const data = {
          question: questionData[1].trim(),
          options: optionsJSON,
          correct_option: questionData[6].trim(),
          image_path: questionData[7].trim(),
          quiz_id: quiz.id,
        };

        const existQuestion = await QuizQuestion.findBy(
          'question',
          questionData[1],
        );

        if (existQuestion) {
          failures.set(questionData, 'Pergunta já cadastrada');
          return;
        }

        await QuizQuestion.create(data);
      } catch (err) {
        failures.set(questionData, err);
      }
    }),
  );

  const errors = handleFailures(failures);

  return { errors };
};
