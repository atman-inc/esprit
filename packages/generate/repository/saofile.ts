import { GeneratorConfig } from "sao";
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
    const ormFile = new GenerateFile(
      answers.name,
      "lib/infrastructure/orm/repositories",
      "Repository"
    );
    const ormSpecFile = new GenerateFile(
      answers.name,
      "spec/infrastructure/orm/repositories",
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
          ormImport: ormFile.importString,
          domainImportPath: domainFile.importPath,
          entityClassName: ormEntityFile.className,
          ormEntityImportPath: ormEntityFile.importPath,
          domainEntityImportPath: domainEntityFile.importPath,
        },
      },
    ];

    actions.push({
      type: "move",
      patterns: {
        "domain.ts.template": domainFile.filePath,
        "orm.ts.template": ormFile.filePath,
        "orm.spec.ts.template": ormSpecFile.filePath,
      },
    });

    actions.push({
      type: "modify",
      files: "lib/infrastructure/di.ts",
      handler: (data: string) => {
        const insertFileManager = new InsertFileManager(data);
        insertFileManager
          .afterInsert(/\} from ('|")/, ormFile.importString)
          .beforeInsert(
            /^}$/,
            `  container.register("${domainFile.className}", { useValue: getCustomRepository(${domainFile.className}) });`
          );

        return insertFileManager.insertedContent;
      },
    });

    return actions;
  },
};

module.exports = generator;
