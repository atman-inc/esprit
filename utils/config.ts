import fs from "fs";

const jsonFilePath = `${process.cwd()}/esprit.config.json`;
let configData: any = {};

if (fs.existsSync(jsonFilePath)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  configData = require(jsonFilePath);
}

export const config = configData;
