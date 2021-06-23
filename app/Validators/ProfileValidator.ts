import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [rules.minLength(2)]),
    email: schema.string.optional({}, [rules.email()]),
    old_password: schema.string.optional({}, [
      rules.minLength(6),
      rules.requiredIfExists('password'),
    ]),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.requiredIfExists('old_password'),
      rules.confirmed(),
    ]),
  });

  public messages = {
    'name.minLength': 'Nome deve conter no mínimo 2 caracteres',
    'email.email': 'E-mail inválido',
    'old_password.requiredIfExists':
      'Necessário preenchimento da senha anterior',
    'old_password.minLength':
      'Senha anterior deve conter no mínimo 6 caracteres',
    'password.minLength': 'Senha deve conter no mínimo 6 caracteres',
    'password.requiredIfExists': 'Informe a nova senha',
    'password_confirmation.confirmed':
      'Confirmação de senha deve ser igual a senha',
    'password_confirmation.minLength':
      'Confirmação de senha deve conter no mínimo 6 caracteres',
  };
}
