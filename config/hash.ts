import Env from '@ioc:Adonis/Core/Env';
import { HashConfig } from '@ioc:Adonis/Core/Hash';

const hashConfig: HashConfig = {
  default: Env.get('HASH_DRIVER', 'bcrypt'),

  list: {
    bcrypt: {
      driver: 'bcrypt',
      rounds: 10,
    },
  },
};

export default hashConfig;
