import { GeneratorConfig } from "sao";
import validate from "validate-npm-package-name";

const generator: GeneratorConfig = {
  prompts() {
    return [
      {
        type: "input",
        name: "name",
        message: "Project name:",
        default: this.outDirName,
      },
      {
        type: "select",
        name: "model",
        message: "API model:",
        choices: [
          { name: "REST", value: "rest" },
          { name: "gRPC", value: "grpc" },
          { name: "GraphQL", value: "graphql" },
        ],
      },
    ];
  },
  actions() {
    const validation = validate(this.answers.name);
    validation.warnings &&
      validation.warnings.forEach((warn) => {
        console.warn("Warning:", warn);
      });
    validation.errors &&
      validation.errors.forEach((err) => {
        console.error("Error:", err);
      });
    validation.errors && validation.errors.length && process.exit(1);

    return [
      {
        type: "add",
        files: "**",
      },
      {
        type: "modify",
        files: "package.json",
        handler: (data) => {
          switch (this.answers.model) {
            case "REST":
              data["dependencies"]["fastify"] = "^3.3.0";
          }
          return data;
        },
      },
    ];
  },
};

module.exports = generator;
