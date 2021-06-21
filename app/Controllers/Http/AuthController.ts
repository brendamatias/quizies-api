import User from 'App/Models/User';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SessionsController {
  public async store({ auth, request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password']);

    const token = await auth.use('api').attempt(email, password);
    const user = await User.findBy('email', email);

    return { user, token };
  }
}
