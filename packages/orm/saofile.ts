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
    // TODO: Project名をどこから取るか
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
            type: "postgres",
          };

          const yamlData = yaml.load(data) || {};
          yamlData["database"] = dbConfig;

          return yaml.dump(yamlData);
        },
      },
      {
        type: "modify",
        files: "docker-compose.yml",
        handler: (data) => {
          const yamlData = yaml.load(data) || {};

          const services = yamlData["services"] || {};
          const appDependsOn = services["app"]["depends_on"] || [];

          appDependsOn.push("db");
          services["app"]["depends_on"] = appDependsOn;

          services["db"] = {
            image: "postgres:11-alpine",
            restart: "always",
            environment: {
              POSTGRES_DB: `${projectName}_development`,
              POSTGRES_USER: "postgres",
              POSTGRES_PASSWORD: "password",
            },
            ports: ["5432:5432"],
            volumes: ["db_data:/var/lib/postgresql/data"],
          };

          const volumes = yamlData["volumes"] || {};
          volumes["db_data"] = { driver: "local" };

          yamlData["services"] = services;
          yamlData["volumes"] = volumes;

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
