import { GeneratorConfig } from "sao";

const generator: GeneratorConfig = {
  actions() {
    const answers: any = this.opts.answers;
    const usecaseName: string = answers.usecaseName;
    const classUsecaseName: string = usecaseName;

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
