import CustomException from 'App/Exceptions/CustomException';
import User from 'App/Models/User';

export default class UsersController {
  public async show({ auth }) {
    const user = await User.find(auth.user.id);

    return user;
  }

  public async update({ auth, request }) {
    const { name, email } = request.only(['name', 'email']);
    const user = await User.find(auth.user.id);

    if (email && user?.email !== email) {
      const userExists = await User.findBy('email', email);

      if (userExists) {
        throw new CustomException('Email já cadastrado', 400, 'USER_EXIST');
      }
    }

    user?.merge({ name, email });

    await user?.save();

    return user;
  }
}
