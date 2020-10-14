import { NodeVersion } from "../../enums/nodeVersion";

interface TSConfig {
  target: string;
  lib: string[];
}

interface VersionConfig {
  tsconfig: TSConfig;
}

export const nodeVersions: {
  [NodeVersion.Version10]: VersionConfig;
  [NodeVersion.Version12]: VersionConfig;
} = {
  [NodeVersion.Version10]: {
    tsconfig: {
      target: "es2018",
      lib: ["es2018"],
    },
  },
  [NodeVersion.Version12]: {
    tsconfig: {
      target: "es2019",
      lib: ["es2019", "es2020.promise", "es2020.bigint", "es2020.string"],
    },
  },
};
