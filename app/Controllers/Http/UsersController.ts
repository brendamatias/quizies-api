import CustomException from 'App/Exceptions/CustomException';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const { name, email, password } = await request.validate(UserValidator);

      const userExists = await User.findBy('email', email);

      if (userExists) {
        throw new CustomException(
          'Email já cadastrado',
          400,
          'USER_ALREADY_REGISTERED',
        );
      }

      const user = await User.create({ name, email, password });

      return response.json(user);
    } catch (error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.badRequest(error.messages);
      }

      throw error;
    }
  }
}
