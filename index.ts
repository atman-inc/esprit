import { createCommand } from "commander";
import { SAO } from "sao";
import { createAddCommand } from "./commands/add";
import { createGenerateCommand } from "./commands/generate";
import { createMigrationCommand } from "./commands/migration";
import { createOpenapiCommand } from "./commands/openapi";
import { config } from "./utils/config";

const program = createCommand();

program.command("new <name>").action((name) => {
  new SAO({
    generator: `${__dirname}/packages/new`,
    outDir: name,
  }).run();
});
program.addCommand(createAddCommand());
program.addCommand(createGenerateCommand());

if (config.orm) {
  program.addCommand(createMigrationCommand());
}

if (config.mode == "REST") {
  program.addCommand(createOpenapiCommand());
}

program.parse(process.argv);
