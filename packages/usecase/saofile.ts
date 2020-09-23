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
    ];
  },
};

module.exports = generator;
