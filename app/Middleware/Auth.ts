import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import { GuardsList } from '@ioc:Adonis/Addons/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthMiddleware {
  protected async authenticate(
    auth: HttpContextContract['auth'],
    guards: (keyof GuardsList)[],
  ) {
    let guardLastAttempted: string | undefined;

    for (const guard of guards) {
      guardLastAttempted = guard;

      if (await auth.use(guard).check()) {
        /**
         * Instruct auth to use the given guard as the default guard for
         * the rest of the request, since the user authenticated
         * succeeded here
         */
        auth.defaultGuard = guard;
        return true;
      }
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
    );
  }

  /**
   * Handle request
   */
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[],
  ) {
    /**
     * Uses the user defined guards or the default guard mentioned in
     * the config file
     */
    const guards = customGuards.length ? customGuards : [auth.name];
    await this.authenticate(auth, guards);
    await next();
  }
}
