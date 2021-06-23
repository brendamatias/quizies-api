import CustomException from 'App/Exceptions/CustomException';
import User from 'App/Models/User';
import ProfileValidator from 'App/Validators/ProfileValidator';

import Hash from '@ioc:Adonis/Core/Hash';

export default class UsersController {
  public async show({ auth }) {
    const user = await User.find(auth.user.id);

    return { id: user?.id, name: user?.name, email: user?.email };
  }

  public async update({ auth, request, response }) {
    try {
      const { name, email, old_password, password } = await request.validate(
        ProfileValidator,
      );

      const user = await User.find(auth.user.id);

      if (!name && !email && !password)
        return { id: user?.id, name: user?.name, email: user?.email };

      if (old_password && user?.password) {
        if (!(await Hash.verify(user.password, old_password)))
          throw new CustomException(
            'Senha anterior inválida',
            400,
            'PASSWORD_INVALID',
          );
      }

      if (email && user?.email !== email) {
        const userExists = await User.findBy('email', email);

        if (userExists) {
          throw new CustomException('Email já cadastrado', 400, 'USER_EXIST');
        }
      }

      user?.merge({
        name: name || user?.name,
        email: email || user?.email,
        password: password || user?.password,
      });

      await user?.save();

      return { id: user?.id, name: user?.name, email: user?.email };
    } catch (error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.badRequest(error.messages);
      }

      throw error;
    }
  }
}
