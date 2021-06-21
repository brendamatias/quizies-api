import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import Logger from '@ioc:Adonis/Core/Logger';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  async handle(error, { response }) {
    if (error.name === 'CustomException') {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }

    return response.status(error.status || 500).send({
      error: {
        message: 'Estamos com problema agora, tente novamente mais tarde',
      },
    });
  }
}
