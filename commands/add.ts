import Commander, { createCommand } from "commander";
import { SAO } from "sao";

export function createAddCommand(): Commander.Command {
  const addCommand = createCommand().name("add");

  addCommand.command("database").action(() => {
    new SAO({
      generator: `${__dirname}/../packages/add/database`,
      outDir: `./`,
    }).run();
  });

  return addCommand;
}
