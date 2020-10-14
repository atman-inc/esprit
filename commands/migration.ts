import Commander, { createCommand } from "commander";
import { execSync } from "child_process";
import { config } from "../utils/config";

export function createMigrationCommand(): Commander.Command {
  const migrationCommand = createCommand().name("migration");
  const ormConfigFilePath = config.orm.configFilePath;

  migrationCommand.command("run").action(() => {
    execSync(`npm run typeorm -- migration:run --config ${ormConfigFilePath}`);
  });

  migrationCommand.command("generate <name>").action((name: string) => {
    execSync(
      `npm run typeorm -- migration:generate --config ${ormConfigFilePath} --name ${name}`
    );
  });

  migrationCommand.command("create <name>").action((name: string) => {
    execSync(
      `npm run typeorm -- migration:create --config ${ormConfigFilePath} --name ${name}`
    );
  });

  migrationCommand.command("revert").action(() => {
    execSync(
      `npm run typeorm -- migration:revert --config ${ormConfigFilePath}`
    );
  });

  return migrationCommand;
}
