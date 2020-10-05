import { createCommand } from "commander";
import { execSync } from "child_process";

const program = createCommand().name("migration");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`${process.cwd()}/esprit.config.json`);
const ormConfigFilePath = config.orm.configFilePath;

program.command("run").action(() => {
  execSync(`npm run typeorm -- migration:run --config ${ormConfigFilePath}`);
});

program.command("generate <name>").action((name: string) => {
  execSync(
    `npm run typeorm -- migration:generate --config ${ormConfigFilePath} --name ${name}`
  );
});

program.command("create <name>").action((name: string) => {
  execSync(
    `npm run typeorm -- migration:create --config ${ormConfigFilePath} --name ${name}`
  );
});

program.command("revert").action(() => {
  execSync(`npm run typeorm -- migration:revert --config ${ormConfigFilePath}`);
});

export const migrationCommand = program;
