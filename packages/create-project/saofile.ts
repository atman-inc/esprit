import { GeneratorConfig } from "sao";
import validate from "validate-npm-package-name";
import { packages } from "./packages";

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
        templateDir: "./template/static",
      },
      {
        type: "add",
        files: "**",
        templateDir: `./template/${this.answers.model}`,
      },
      {
        type: "modify",
        files: "package.json",
        handler: (data) => {
          const model: "REST" | "gRPC" | "GraphQL" = this.answers.model;
          Object.assign(data["dependencies"], packages[model].dependencies);
          Object.assign(
            data["devDependencies"],
            packages[model].devDependencies
          );

          return data;
        },
      },
    ];
  },
  completed() {
    // this.npmInstall({ npmClient: "npm" });
  },
};

module.exports = generator;
