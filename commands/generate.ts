import { createCommand } from "commander";
import { SAO } from "sao";

export const createGenerateCommand = () => {
  const generateCommand = createCommand().name("generate");

  generateCommand.command("usecase <name>").action((name: string) => {
    new SAO({
      generator: `${__dirname}/../packages/generate/usecase`,
      outDir: `./`,
      answers: {
        name,
      },
    }).run();
  });

  generateCommand.command("entity <name>").action((name: string) => {
    new SAO({
      generator: `${__dirname}/../packages/generate/entity`,
      outDir: `./`,
      answers: {
        name,
      },
    }).run();
  });

  generateCommand.command("repository <name>").action((name: string) => {
    new SAO({
      generator: `${__dirname}/../packages/generate/repository`,
      outDir: `./`,
      answers: {
        name,
      },
    }).run();
  });

  return generateCommand;
};
