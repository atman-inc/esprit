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
      "fastify-openapi-glue": "^2.2.0",
    },
    devDependencies: {},
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
