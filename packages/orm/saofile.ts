import { GeneratorConfig } from "sao";
import yaml from "js-yaml";
import { databases } from "./databases";

type DatabaseType = "mysql" | "postgres";

const generator: GeneratorConfig = {
  prompts() {
    return [
      {
        type: "select",
        name: "database",
        message: "Database:",
        choices: [
          { name: "postgres", value: "postgres" },
          { name: "mysql", value: "mysql" },
        ],
      },
    ];
  },
  async actions() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(`${process.cwd()}/esprit.config.json`);
    const projectName = config.name;

    const databaseType: DatabaseType = this.answers.database;
    const database = databases[databaseType];

    return [
      {
        type: "add",
        files: "**",
      },
      {
        type: "modify",
        files: "config/default.yml",
        handler: (data) => {
          const dbConfig = {
            name: projectName,
            port: "DB_PORT",
            host: "DB_HOST",
            user: "DB_USER",
            password: "DB_PASSWORD",
            type: databaseType,
          };

          const yamlData = yaml.load(data) || {};
          yamlData["database"] = dbConfig;

          return yaml.dump(yamlData);
        },
      },
      {
        type: "modify",
        files: "package.json",
        handler: (data) => {
          data["dependencies"]["typeorm"] = "^0.2.26";
          data["dependencies"]["typeorm-seeding"] = "^1.6.1";

          Object.assign(data["dependencies"], database.package.dependencies);
          Object.assign(
            data["devDependencies"],
            database.package.devDependencies
          );

          data["scripts"]["typeorm"] =
            "node --require ts-node/register ./node_modules/typeorm/cli.js";

          return data;
        },
      },
      {
        type: "modify",
        files: "esprit.config.json",
        handler: (data) => {
          data["orm"] = {
            configFilePath: "lib/infrastructure/orm/ormconfig.ts",
          };

          return data;
        },
      },
    ];
  },
  completed() {
    this.npmInstall({ npmClient: "npm" });
  },
};

module.exports = generator;
