import { createCommand } from "commander";
import { SAO } from "sao";

export const generateCommand = createCommand().name("generate");

generateCommand.command("usecase <name>").action((name: string) => {
  new SAO({
    generator: `${__dirname}/../packages/usecase`,
    outDir: `./`,
    answers: {
      name,
    },
  }).run();
});
