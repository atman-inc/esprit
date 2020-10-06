import Commander, { createCommand } from "commander";
import { SAO } from "sao";

export function createAddCommand(): Commander.Command {
  const addCommand = createCommand().name("add");

  addCommand.command("orm").action(() => {
    new SAO({
      generator: `${__dirname}/packages/orm`,
      outDir: `./`,
    }).run();
  });

  return addCommand;
}
