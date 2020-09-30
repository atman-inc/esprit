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
        const toInsertImport = ormFile.importString;
        const contentLines: string[] = data.split("\n");
        const finalImportIndex = findImportsEndpoint(contentLines);
        const finalRegisterIndex = contentLines.indexOf("}");

        function findImportsEndpoint(contentLines: string[]): number {
          const reversedContent = Array.from(contentLines).reverse();
          const reverseImports = reversedContent.filter((line) =>
            line.match(/\} from ('|")/)
          );
          if (reverseImports.length <= 0) {
            return 0;
          }
          return contentLines.indexOf(reverseImports[0]);
        }

        contentLines.splice(finalImportIndex + 1, 0, toInsertImport);
        contentLines.splice(
          finalRegisterIndex + 1,
          0,
          ` . container.register("${domainFile.className}", { useValue: getCustomRepository(${domainFile.className}) });`
        );

        return contentLines.join("\n");
      },
    });

    return actions;
  },
};

module.exports = generator;
