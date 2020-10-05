import { GeneratorConfig } from "sao";
import { GenerateFile } from "../../../utils/GenerateFile";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };

    const controllerFile = new GenerateFile(
      answers.name,
      "lib/interface/controllers",
      "Controller"
    );
    const specFile = new GenerateFile(
      answers.name,
      "spec/interface/controllers",
      "Controller.spec"
    );

    return [
      {
        type: "add",
        files: "**",
        data: {
          className: controllerFile.className,
          controllerImport: controllerFile.importString,
        },
      },
      {
        type: "move",
        patterns: {
          "controller.ts.template": controllerFile.filePath,
          "spec.ts.template": specFile.filePath,
        },
      },
    ];
  },
};

module.exports = generator;
