import { GeneratorConfig } from "sao";
import { classify } from "underscore.string";

const generator: GeneratorConfig = {
  actions() {
    const answers: any = this.opts.answers;
    const usecaseNameArray: string[] = answers.usecaseName.split("/");
    const usecaseName = usecaseNameArray.pop();

    if (!usecaseName) {
      throw new Error("Required usecase name");
    }

    const classUsecaseName = classify(usecaseName);
    const usecasePath = ["lib/application/usecases"]
      .concat(usecaseNameArray)
      .join("/");
    const interactorPath = ["lib/application/interactor"]
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
        },
      },
      {
        type: "move",
        patterns: {
          "usecase.ts.template": `${usecasePath}/${usecaseName}Usecase.ts`,
          "interactor.ts.template": `${interactorPath}/${usecaseName}Interactor.ts`,
        },
      },
    ];
  },
};

module.exports = generator;
