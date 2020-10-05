import { GeneratorConfig } from "sao";
import { GenerateFile } from "../../../utils/GenerateFile";
import { InsertFileManager } from "../../../utils/InsertFileManager";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };

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
          const insertFileManager = new InsertFileManager(data);
          insertFileManager
            .afterInsert(/\} from ('|")/, interactorFile.importString)
            .beforeInsert(
              /^}$/,
              `  container.register("${usecaseFile.className}", { useClass: ${interactorFile.className} });`
            );

          return insertFileManager.insertedContent;
        },
      },
    ];
  },
};

module.exports = generator;
