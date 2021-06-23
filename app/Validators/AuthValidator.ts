import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)]),
  });

  public messages = {
    'email.required': 'E-mail é obrigatório',
    'email.email': 'E-mail inválido',
    'password.required': 'Senha é obrigatória',
    'password.minLength': 'Senha deve conter no mínimo 6 caracteres',
  };
}
