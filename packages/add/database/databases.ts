import { DependencyPackage } from "../../../utils/DependencyPackage";
import { ORM } from "../../../enums/orm";
import { Database as DatabaseType } from "../../../enums/database";

interface Database {
  port?: number;
  orm: ORM;
  scripts: { [key: string]: string };
  package: DependencyPackage;
}

const typeormScripts = {
  typeorm: "node --require ts-node/register ./node_modules/typeorm/cli.js",
};
const typeormPackages = {
  typeorm: "^0.2.26",
  "typeorm-seeding": "^1.6.1",
};

export const databases: {
  [DatabaseType.Postgres]: Database;
  [DatabaseType.MySQL]: Database;
  [DatabaseType.Datastore]: Database;
} = {
  mysql: {
    port: 3306,
    orm: ORM.TypeORM,
    scripts: typeormScripts,
    package: {
      dependencies: {
        ...typeormPackages,
        mysql: "^2.18.1",
      },
      devDependencies: {},
    },
  },

  postgres: {
    port: 5432,
    orm: ORM.TypeORM,
    scripts: typeormScripts,
    package: {
      dependencies: {
        ...typeormPackages,
        pg: "^8.3.3",
      },
      devDependencies: {},
    },
  },

  "firestore-datastore": {
    orm: ORM.None,
    scripts: {},
    package: {
      dependencies: {
        "@google-cloud/datastore": "^6.1.1",
      },
      devDependencies: {},
    },
  },
};
