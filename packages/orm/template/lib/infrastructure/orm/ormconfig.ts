import config from "config";

interface DBConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  type: string;
}

const dbConfig = config.get<DBConfig>("database");

module.exports = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: ["lib/infrastructure/orm/entities/*.ts"],
  migrationsTableName: "migration_table",
  migrations: ["lib/infrastructure/orm/migrations/*.ts"],
  factories: ["lib/infrastructure/orm/factories/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "lib/infrastructure/orm/entities",
    migrationsDir: "lib/infrastructure/orm/migrations",
  },
};
