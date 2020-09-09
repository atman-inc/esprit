import { GeneratorConfig } from "sao";

const generator: GeneratorConfig = {
  prompts() {
    return [
      {
        type: "input",
        name: "name:",
        message: "Project name:",
        default: this.outDirName,
      },
    ];
  },
};

module.exports = generator;
