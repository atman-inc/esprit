import { GeneratorConfig } from "sao";

const generator: GeneratorConfig = {
  prompts() {
    return [
      {
        type: "select",
        name: "mode",
        message: "Database:",
        choices: [
          { name: "postgresql", value: "postgres" },
          { name: "mysql", value: "mysql" },
        ],
      },
    ];
  },
  actions() {
    return [
      {
        type: "add",
        files: "**",
      },
      {
        type: "modify",
        files: "package.json",
        handler: (data) => {
          data["dependencies"]["pg"] = "^8.3.3";
          data["dependencies"]["typeorm"] = "^0.2.26";
          data["dependencies"]["typeorm-seeding"] = "^1.6.1";

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
