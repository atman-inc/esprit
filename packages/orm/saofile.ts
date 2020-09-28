import { GeneratorConfig } from "sao";
import yaml from "js-yaml";

interface Config {
  name: string;
}

const generator: GeneratorConfig = {
  prompts() {
    return [
      {
        type: "select",
        name: "mode",
        message: "Database:",
        choices: [
          { name: "postgresql", value: "postgres" },
          { name: "mysql", value: "mysql" },
        ],
      },
    ];
  },
  async actions() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config: Config = require(`${process.cwd()}/esprit.config.js`);
    const projectName = config.name;

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
            type: "postgres",
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
          // TODO: Databaseごとに変更する
          data["dependencies"]["pg"] = "^8.3.3";
          data["dependencies"]["typeorm"] = "^0.2.26";
          data["dependencies"]["typeorm-seeding"] = "^1.6.1";
          data["scripts"]["typeorm"] =
            "node --require ts-node/register ./node_modules/typeorm/cli.js";

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
