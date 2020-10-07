import { GeneratorConfig } from "sao";
import { Database } from "../../../enums/database";
import { ORM } from "../../../enums/orm";
import { config } from "../../../utils/config";
import { GenerateFile } from "../../../utils/GenerateFile";
import { InsertFileManager } from "../../../utils/InsertFileManager";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };

    const domainFile = new GenerateFile(
      answers.name,
      "lib/domain/repositories",
      "Repository"
    );
    const infraFile = new GenerateFile(
      answers.name,
      "lib/infrastructure/repositories",
      "Repository"
    );
    const specFile = new GenerateFile(
      answers.name,
      "spec/infrastructure/repositories",
      "Repository.spec"
    );
    const domainEntityFile = new GenerateFile(
      answers.name,
      "lib/domain/entities"
    );
    const ormEntityFile = new GenerateFile(
      answers.name,
      "lib/infrastructure/orm/entities"
    );

    const actions: any = [
      {
        type: "add",
        files: "**",
        data: {
          className: domainFile.className,
          infraImport: infraFile.importString,
          domainImportPath: domainFile.importPath,
          entityClassName: ormEntityFile.className,
          ormEntityImportPath: ormEntityFile.importPath,
          domainEntityImportPath: domainEntityFile.importPath,
        },
        filters: {
          "typeorm.ts.template": config.database.orm === ORM.TypeORM,
          "datastore.ts.template": config.database.type === Database.Datastore,
        },
      },
    ];

    actions.push({
      type: "move",
      patterns: {
        "domain.ts.template": domainFile.filePath,
        "typeorm.ts.template": infraFile.filePath,
        "datastore.ts.template": infraFile.filePath,
        "spec.ts.template": specFile.filePath,
      },
    });

    actions.push({
      type: "modify",
      files: "lib/infrastructure/di.ts",
      handler: (data: string) => {
        const insertFileManager = new InsertFileManager(data);
        insertFileManager.afterInsert(/\} from ('|")/, infraFile.importString);

        if (config.database.orm === ORM.TypeORM) {
          insertFileManager.beforeInsert(
            /^}$/,
            `  container.register("${domainFile.className}", { useValue: getCustomRepository(${domainFile.className}) });`
          );
        }

        if (config.database.type === Database.Datastore) {
          insertFileManager.beforeInsert(
            /^}$/,
            `  container.register("${domainFile.className}", { useClass: ${domainFile.className} });`
          );
        }

        return insertFileManager.insertedContent;
      },
    });

    return actions;
  },
};

module.exports = generator;
