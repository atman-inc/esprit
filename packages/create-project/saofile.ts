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
        name: "mode",
        message: "API mode:",
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
        templateDir: `./template/${this.answers.mode}`,
      },
      {
        type: "modify",
        files: "package.json",
        handler: (data) => {
          const mode: "REST" | "gRPC" | "GraphQL" = this.answers.mode;
          Object.assign(data["dependencies"], packages[mode].dependencies);
          Object.assign(
            data["devDependencies"],
            packages[mode].devDependencies
          );

          if (this.answers.mode === "GraphQL") {
            data["scripts"]["generate"] =
              "graphql-codegen --config codegen.yml";
          }

          return data;
        },
      },
    ];
  },
  completed() {
    this.npmInstall({ npmClient: "npm" });
  },
};

module.exports = generator;
