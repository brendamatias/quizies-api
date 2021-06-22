import CustomException from 'App/Exceptions/CustomException';
import User from 'App/Models/User';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const { name, email, password } = request.only([
      'name',
      'email',
      'password',
    ]);

    const userExists = await User.findBy('email', email);

    if (userExists) {
      throw new CustomException(
        'Email já cadastrado',
        400,
        'USER_ALREADY_REGISTERED',
      );
    }

    const user = await User.create({ name, email, password });

    return user;
  }
}
