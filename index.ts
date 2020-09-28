import { createCommand } from "commander";
import { SAO } from "sao";

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

program.parse(process.argv);
