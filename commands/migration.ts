import Commander, { createCommand } from "commander";
import { execSync } from "child_process";

export function createMigrationCommand(): Commander.Command {
  const migrationCommand = createCommand().name("migration");

  migrationCommand.command("run").action(() => {
    execSync(`npm run typeorm -- migration:run`);
  });

  migrationCommand.command("generate <name>").action((name: string) => {
    execSync(`npm run typeorm -- migration:generate --name ${name}`);
  });

  migrationCommand.command("create <name>").action((name: string) => {
    execSync(`npm run typeorm -- migration:create --name ${name}`);
  });

  migrationCommand.command("revert").action(() => {
    execSync(`npm run typeorm -- migration:revert`);
  });

  return migrationCommand;
}
