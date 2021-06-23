import CustomException from 'App/Exceptions/CustomException';
import User from 'App/Models/User';
import AuthValidator from 'App/Validators/AuthValidator';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SessionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(AuthValidator);

      const user = await User.findBy('email', email);

      if (!user) {
        throw new CustomException('User não encontrado', 400, 'USER_NOT_FOUND');
      }

      const token = await auth.use('api').attempt(email, password);

      return {
        user: { id: user.id, name: user.name, email: user.email },
        token,
      };
    } catch (error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.badRequest(error.messages);
      }

      throw error;
    }
  }
}
