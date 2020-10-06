import { DependencyPackage } from "../../../utils/dependency_package";

interface Database {
  port: number;
  package: DependencyPackage;
}

export const databases: {
  mysql: Database;
  postgres: Database;
} = {
  mysql: {
    port: 3306,
    package: {
      dependencies: {
        mysql: "^2.18.1",
      },
      devDependencies: {},
    },
  },

  postgres: {
    port: 5432,
    package: {
      dependencies: {
        pg: "^8.3.3",
      },
      devDependencies: {},
    },
  },
};
