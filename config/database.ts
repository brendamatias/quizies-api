import Url from 'url-parse';

import Env from '@ioc:Adonis/Core/Env';
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm';

const dbConfig = {
  host: Env.get('PG_HOST'),
  port: Env.get('PG_PORT'),
  user: Env.get('PG_USER'),
  password: Env.get('PG_PASSWORD', ''),
  database: Env.get('PG_DB_NAME'),
};

if (Env.get('DATABASE_URL')) {
  const DB_DATABASE_URL = new Url(Env.get('DATABASE_URL'));

  if (DB_DATABASE_URL) {
    const [host, port] = DB_DATABASE_URL.host.split(':');

    dbConfig.host = host;
    dbConfig.port = port;
    dbConfig.user = DB_DATABASE_URL.username;
    dbConfig.password = DB_DATABASE_URL.password;
    dbConfig.database = DB_DATABASE_URL.pathname.substr(1);
  }
}

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      healthCheck: false,
      debug: false,
    },
  },

  orm: {},
};

export default databaseConfig;
