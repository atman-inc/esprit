import { createCommand } from "commander";
import { SAO } from "sao";
import { createGenerateCommand } from "./commands/generate";
import { createMigrationCommand } from "./commands/migration";
import { config } from "./utils/config";

const program = createCommand();
program.command("create-project <projectName>").action((projectName) => {
  new SAO({
    generator: `${__dirname}/packages/create-project`,
    outDir: `${projectName}`,
  }).run();
});

program.command("add orm").action(() => {
  new SAO({
    generator: `${__dirname}/packages/orm`,
    outDir: `./`,
  }).run();
});

program.addCommand(createGenerateCommand());
if (config.orm) {
  program.addCommand(createMigrationCommand());
}
program.parse(process.argv);
