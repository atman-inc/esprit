import { GeneratorConfig } from "sao";
import { GenerateFile } from "../../../utils/GenerateFile";
import { config } from "../../../utils/config";

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

    const actions: any = [
      {
        type: "add",
        files: ["domain.ts.template"],
        data: {
          className: domainFile.className,
        },
      },
    ];

    if (config.orm) {
      const domainEntityFile = new GenerateFile(
        answers.name,
        "lib/domain/entities"
      );
      const ormEntityFile = new GenerateFile(
        answers.name,
        "lib/infrastructure/orm/entities"
      );
      actions.push({
        type: "add",
        files: ["orm.ts.template", "orm.spec.ts.template"],
        data: {
          className: ormFile.className,
          ormImport: ormFile.importString,
          domainImportPath: domainFile.importPath,
          entityClassName: ormEntityFile.className,
          ormEntityImportPath: ormEntityFile.importPath,
          domainEntityImportPath: domainEntityFile.importPath,
        },
      });
    }

    actions.push({
      type: "move",
      patterns: {
        "domain.ts.template": domainFile.filePath,
        "orm.ts.template": ormFile.filePath,
        "orm.spec.ts.template": ormSpecFile.filePath,
      },
    });

    return actions;
  },
};

module.exports = generator;
