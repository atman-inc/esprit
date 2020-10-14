import { GeneratorConfig } from "sao";
import yaml from "js-yaml";
import { databases } from "./databases";
import { config } from "../../../utils/config";
import { InsertFileManager } from "../../../utils/InsertFileManager";
import { ORM } from "../../../enums/orm";
import { Database } from "../../../enums/database";

const databaseChoices = Object.entries(Database).map(([_, val]) => val);

const generator: GeneratorConfig = {
  prompts() {
    return [
      {
        type: "select",
        name: "database",
        message: "Database:",
        choices: databaseChoices,
      },
    ];
  },
  async actions() {
    const projectName = config.name;
    const databaseType: Database = this.answers.database;
    const database = databases[databaseType];

    const actions: any = [];

    actions.push({
      type: "add",
      files: "**",
      filters: {
        "ormconfig.ts": database.orm == ORM.TypeORM,
        "lib/infrastructure/orm/factories/.keep": database.orm == ORM.TypeORM,
        "lib/infrastructure/orm/migrations/.keep": database.orm == ORM.TypeORM,
      },
    });

    actions.push({
      type: "modify",
      files: "package.json",
      handler: (data: any) => {
        Object.assign(data["dependencies"], database.package.dependencies);
        Object.assign(
          data["devDependencies"],
          database.package.devDependencies
        );
        Object.assign(data["scripts"], database.scripts);

        return data;
      },
    });

    actions.push({
      type: "modify",
      files: "esprit.config.json",
      handler: (data: any) => {
        data["database"] = { type: this.answers.database, orm: database.orm };

        return data;
      },
    });

    if (database.orm == ORM.TypeORM) {
      actions.push({
        type: "modify",
        files: "config/custom-environment-variables.yml",
        handler: (data: any) => {
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
      });

      actions.push({
        type: "modify",
        files: "lib/infrastructure/di.ts",
        handler: (data: string) => {
          const insertFileManager = new InsertFileManager(data);
          insertFileManager.afterInsert(
            /\} from ('|")/,
            'import { getCustomRepository } from "typeorm";'
          );

          return insertFileManager.insertedContent;
        },
      });
    }

    if (this.answers.database === Database.Datastore) {
      actions.push({
        type: "modify",
        files: "lib/infrastructure/di.ts",
        handler: (data: string) => {
          const insertFileManager = new InsertFileManager(data);
          insertFileManager.afterInsert(
            /\} from ('|")/,
            'import { Datastore } from "@google-cloud/datastore";'
          );
          insertFileManager.afterInsert(
            /registerDI/,
            '  container.register("Datastore", { useValue: new Datastore() });'
          );

          return insertFileManager.insertedContent;
        },
      });
    }

    return actions;
  },
  completed() {
    this.npmInstall({ npmClient: "npm" });
  },
};

module.exports = generator;
