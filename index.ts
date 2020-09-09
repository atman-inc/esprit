import { createCommand } from "commander";
import { SAO } from "sao";

const program = createCommand();
program.command("create-project <projectName>").action((projectName) => {
  new SAO({
    generator: `${__dirname}/packages/create-project`,
    outDir: `${__dirname}/${projectName}`,
  }).run();
});

program.parse(process.argv);
