import inquirer from "inquirer";

export const createProject = (projectName: string) => {
  inquirer.prompt([
    {
      type: "list",
      name: "protocol",
      message: "Please select a protocol",
      choices: ["REST", "gRPC", "GraphQL"],
    },
  ]);
};
