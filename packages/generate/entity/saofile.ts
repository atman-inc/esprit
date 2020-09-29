import { GeneratorConfig } from "sao";
import { GenerateFile } from "../../../utils/GenerateFile";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };

    const domainFile = new GenerateFile(answers.name, "lib/domain/entities");
    const specFile = new GenerateFile(
      answers.name,
      "spec/domain/entities",
      ".spec"
    );

    return [
      {
        type: "add",
        files: "**",
        data: {
          className: domainFile.className,
          domainImport: domainFile.importString,
        },
      },
      {
        type: "move",
        patterns: {
          "domain.ts.template": domainFile.filePath,
          "spec.ts.template": specFile.filePath,
        },
      },
    ];
  },
};

module.exports = generator;
