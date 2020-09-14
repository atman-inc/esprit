interface Package {
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
}

export const packages: {
  REST: Package;
  gRPC: Package;
  GraphQL: Package;
} = {
  REST: {
    dependencies: {
      fastify: "3.1.0",
    },
    devDependencies: {
      hoge: "1.1.1",
    },
  },
  gRPC: {
    dependencies: {},
    devDependencies: {},
  },
  GraphQL: {
    dependencies: {},
    devDependencies: {},
  },
};
