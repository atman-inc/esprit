import { createCommand } from "commander";
import { SAO } from "sao";
import { migrationCommand } from "./commands/migration";

const program = createCommand();
program.command("create-project <projectName>").action((projectName) => {
  new SAO({
    generator: `${__dirname}/packages/create-project`,
    outDir: `${projectName}`,
  }).run();
});

program.command("usecase <usecaseName>").action((usecaseName) => {
  new SAO({
    generator: `${__dirname}/packages/usecase`,
    outDir: `./`,
    answers: {
      usecaseName,
    },
  }).run();
});

program.command("add orm").action(() => {
  new SAO({
    generator: `${__dirname}/packages/orm`,
    outDir: `./`,
  }).run();
});

program.addCommand(migrationCommand);
program.parse(process.argv);
