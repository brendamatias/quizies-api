import CustomException from 'App/Exceptions/CustomException';

import { GuardsList } from '@ioc:Adonis/Addons/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthMiddleware {
  protected async authenticate(
    auth: HttpContextContract['auth'],
    guards: (keyof GuardsList)[],
  ) {
    const guard = guards[0];

    if (await auth.use(guard).check()) {
      auth.defaultGuard = guard;
      return true;
    }

    throw new CustomException(
      'Usuário não autorizado',
      401,
      'E_UNAUTHORIZED_ACCESS',
    );
  }

  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[],
  ) {
    const guards = customGuards.length ? customGuards : [auth.name];
    await this.authenticate(auth, guards);
    await next();
  }
}
