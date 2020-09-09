import { createCommand } from "commander";
import { createProject } from "./project";

const program = createCommand();
program.command("create project <projectName>").action((projectName) => {
  createProject(projectName);
});

program.parse(process.argv);
