import { DependencyPackage } from "../../utils/DependencyPackage";

export const packages: {
  REST: DependencyPackage;
  gRPC: DependencyPackage;
  GraphQL: DependencyPackage;
} = {
  REST: {
    dependencies: {
      fastify: "3.1.0",
      "fastify-openapi-glue": "^2.2.0",
    },
    devDependencies: {
      dtsgenerator: "^3.3.1",
    },
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
    dependencies: {
      apollo: "^2.30.2",
      "apollo-server": "^2.16.1",
      graphql: "^15.3.0",
    },
    devDependencies: {
      "@graphql-codegen/cli": "1.17.8",
      "@graphql-codegen/introspection": "1.17.8",
      "@graphql-codegen/typescript": "^1.17.8",
      "@graphql-codegen/typescript-resolvers": "^1.17.8",
      "graphql-tools": "^6.0.18",
    },
  },
};
