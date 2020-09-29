import { GeneratorConfig } from "sao";
import { GenerateFile } from "../../../utils/GenerateFile";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };
    const usecaseNameArray: string[] = answers.name.split("/");
    const usecaseName = usecaseNameArray.pop();

    if (!usecaseName) {
      throw new Error("Required usecase name");
    }

    const usecaseFile = new GenerateFile(
      answers.name,
      "lib/application/usecases",
      "Usecase"
    );
    const interactorFile = new GenerateFile(
      answers.name,
      "lib/application/interactors",
      "Interactor"
    );
    const specFile = new GenerateFile(
      answers.name,
      "spec/application/interactors",
      "Interactor.spec"
    );

    return [
      {
        type: "add",
        files: "**",
        data: {
          usecaseClassName: usecaseFile.className,
          usecaseImport: usecaseFile.importString,
          interactorClassName: interactorFile.className,
          interactorImport: interactorFile.importString,
        },
      },
      {
        type: "move",
        patterns: {
          "usecase.ts.template": usecaseFile.filePath,
          "interactor.ts.template": interactorFile.filePath,
          "interactor.spec.ts.template": specFile.filePath,
        },
      },
      {
        type: "modify",
        files: "lib/infrastructure/di.ts",
        handler: (data) => {
          const toInsertImport = interactorFile.importString;
          const toInsertRegister = `  container.register("${usecaseFile.className}", { useClass: ${interactorFile.className} });`;
          const contentLines: string[] = data.split("\n");
          const finalImportIndex = findImportsEndpoint(contentLines);
          const finalRegisterIndex = findRegisterEndpoint(contentLines);

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

          function findRegisterEndpoint(contentLines: string[]): number {
            const reversedContent = Array.from(contentLines).reverse();
            const reverseRegister = reversedContent.filter((line) =>
              line.match(/(container.register|register = )/)
            );
            if (reverseRegister.length <= 0) {
              return 0;
            }
            return contentLines.indexOf(reverseRegister[0]);
          }

          contentLines.splice(finalImportIndex + 1, 0, toInsertImport);
          contentLines.splice(finalRegisterIndex + 2, 0, toInsertRegister);

          return contentLines.join("\n");
        },
      },
    ];
  },
};

module.exports = generator;
