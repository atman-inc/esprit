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
    dependencies: {
      grpc: "^1.24.3",
    },
    devDependencies: {
      "@types/google-protobuf": "^3.7.3",
      "grpc-tools": "^1.9.1",
      grpc_tools_node_protoc_ts: "^4.1.3",
    },
  },
  GraphQL: {
    dependencies: {},
    devDependencies: {},
  },
};
