import { GeneratorConfig } from "sao";
import { classify } from "underscore.string";

const generator: GeneratorConfig = {
  actions() {
    const answers: any = this.opts.answers;
    const usecaseNameArray: string[] = answers.name.split("/");
    const usecaseName = usecaseNameArray.pop();

    if (!usecaseName) {
      throw new Error("Required usecase name");
    }

    const classUsecaseName = classify(usecaseName);
    const usecasePath = ["application/usecases"]
      .concat(usecaseNameArray)
      .join("/");
    const interactorPath = ["application/interactor"]
      .concat(usecaseNameArray)
      .join("/");

    return [
      {
        type: "add",
        files: "**",
        data: {
          usecaseName,
          classUsecaseName,
          usecasePath,
          interactorPath,
        },
      },
      {
        type: "move",
        patterns: {
          "usecase.ts.template": `lib/${usecasePath}/${usecaseName}Usecase.ts`,
          "interactor.ts.template": `lib/${interactorPath}/${usecaseName}Interactor.ts`,
          "interactor.spec.ts.template": `spec/${interactorPath}/${usecaseName}Interactor.spec.ts`,
        },
      },
      {
        type: "modify",
        files: "lib/infrastructure/di.ts",
        handler: (data) => {
          const toInsertImport = `import { ${classUsecaseName}Interactor } from "lib/${interactorPath}/${usecaseName}Interactor"`;
          const toInsertRegister = `  container.register("${classUsecaseName}Usecase", { useClass: ${classUsecaseName}Interactor });`;
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
