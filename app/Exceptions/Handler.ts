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
        .send({ error: { code: error.code, message: error.message } });
    }

    const message = 'Estamos com problema agora, tente novamente mais tarde';

    return response.status(error.status || 500).send({
      error: {
        code: error.code,
        message,
      },
    });
  }
}
