import { GeneratorConfig } from "sao";
import yaml from "js-yaml";
import path from "path";

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
    // TODO
    const projectName = path.basename(__dirname);

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
          data["dependencies"]["pg"] = "^8.3.3";
          data["dependencies"]["typeorm"] = "^0.2.26";
          data["dependencies"]["typeorm-seeding"] = "^1.6.1";

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
