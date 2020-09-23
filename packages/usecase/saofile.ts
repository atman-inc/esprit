import { GeneratorConfig } from "sao";
import { classify } from "underscore.string";

const generator: GeneratorConfig = {
  actions() {
    const answers: any = this.opts.answers;
    const usecaseName: string = answers.usecaseName;
    const classUsecaseName: string = classify(usecaseName);
    console.log(classUsecaseName);

    return [
      {
        type: "add",
        files: "**",
        data: {
          usecaseName,
          classUsecaseName,
        },
      },
      {
        type: "move",
        patterns: {
          "usecase.ts.template": `lib/application/usecases/${usecaseName}Usecase.ts`,
          "interactor.ts.template": `lib/application/interactors/${usecaseName}Interactor.ts`,
        },
      },
    ];
  },
};

module.exports = generator;
