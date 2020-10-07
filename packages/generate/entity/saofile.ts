import { GeneratorConfig } from "sao";
import { GenerateFile } from "../../../utils/GenerateFile";
import { config } from "../../../utils/config";
import { ORM } from "../../../enums/orm";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };

    const domainFile = new GenerateFile(answers.name, "lib/domain/entities");
    const specFile = new GenerateFile(
      answers.name,
      "spec/domain/entities",
      ".spec"
    );
    const ormFile = new GenerateFile(
      answers.name,
      "lib/infrastructure/orm/entities"
    );
    const ormSpecFile = new GenerateFile(
      answers.name,
      "spec/infrastructure/orm/entities",
      ".spec"
    );

    const actions: any = [
      {
        type: "add",
        files: ["domain.ts.template", "spec.ts.template"],
        data: {
          className: domainFile.className,
          domainImport: domainFile.importString,
        },
      },
    ];

    if (config.orm.type === ORM.TypeORM) {
      actions.push({
        type: "add",
        files: ["orm.ts.template", "orm.spec.ts.template"],
        data: {
          className: ormFile.className,
          ormImport: ormFile.importString,
        },
      });
    }

    actions.push({
      type: "move",
      patterns: {
        "domain.ts.template": domainFile.filePath,
        "spec.ts.template": specFile.filePath,
        "orm.ts.template": ormFile.filePath,
        "orm.spec.ts.template": ormSpecFile.filePath,
      },
    });

    return actions;
  },
};

module.exports = generator;
