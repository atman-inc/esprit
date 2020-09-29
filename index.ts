import { createCommand } from "commander";
import { SAO } from "sao";
import { migrationCommand } from "./commands/migration";
import { generateCommand } from "./commands/generate";

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

program.addCommand(generateCommand);
program.addCommand(migrationCommand);
program.parse(process.argv);
