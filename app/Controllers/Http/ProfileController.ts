import CustomException from 'App/Exceptions/CustomException';
import User from 'App/Models/User';
import ProfileValidator from 'App/Validators/ProfileValidator';

import Hash from '@ioc:Adonis/Core/Hash';
import Database from '@ioc:Adonis/Lucid/Database';

export default class UsersController {
  public async show({ auth }) {
    const user = await Database.from('users')
      .select([
        'users.id',
        'users.name',
        Database.raw(
          `(SELECT sum(score) FROM scores WHERE user_id = '${auth.user.id}') as score`,
        ),
      ])
      .where('users.id', auth.user.id)
      .first();

    const ranking = await Database.rawQuery(`
      SELECT id, sum FROM
      (SELECT users.id, SUM(score) AS sum FROM scores
       left join users on users.id = scores.user_id
       group by users.id) score
      WHERE sum >= ${user.score}
      ORDER BY sum;
    `);

    const position = ranking.rows.findIndex(
      element => element.id === auth.user.id,
    );

    user.position = position + 1;

    return user;
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
