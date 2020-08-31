import config from "config";

interface DBConfig {
  host: string;
  name: string;
  user: string;
  password: string;
}

const dbConfig = config.get<DBConfig>("database");

module.exports = {
  type: "postgres",
  host: dbConfig.host,
  port: 5432,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: ["entities/*.ts"],
  migrationsTableName: "migration_table",
  migrations: ["migrations/*.ts"],
  cli: {
    entitiesDir: "lib/infrastructure/orm/entities",
    migrationsDir: "lib/infrastructure/orm/migrations",
  },
};
