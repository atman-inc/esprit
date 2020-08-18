// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as users_pb from "./users_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    findAll: IUsersService_IFindAll;
    findOne: IUsersService_IFindOne;
}

interface IUsersService_IFindAll extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, users_pb.UsersResponse> {
    path: string; // "/users.Users/FindAll"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<users_pb.UsersResponse>;
    responseDeserialize: grpc.deserialize<users_pb.UsersResponse>;
}
interface IUsersService_IFindOne extends grpc.MethodDefinition<users_pb.UserFindOneRequest, users_pb.UserResponse> {
    path: string; // "/users.Users/FindOne"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.UserFindOneRequest>;
    requestDeserialize: grpc.deserialize<users_pb.UserFindOneRequest>;
    responseSerialize: grpc.serialize<users_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<users_pb.UserResponse>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    findAll: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, users_pb.UsersResponse>;
    findOne: grpc.handleUnaryCall<users_pb.UserFindOneRequest, users_pb.UserResponse>;
}

export interface IUsersClient {
    findAll(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: users_pb.UsersResponse) => void): grpc.ClientUnaryCall;
    findAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UsersResponse) => void): grpc.ClientUnaryCall;
    findAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UsersResponse) => void): grpc.ClientUnaryCall;
    findOne(request: users_pb.UserFindOneRequest, callback: (error: grpc.ServiceError | null, response: users_pb.UserResponse) => void): grpc.ClientUnaryCall;
    findOne(request: users_pb.UserFindOneRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UserResponse) => void): grpc.ClientUnaryCall;
    findOne(request: users_pb.UserFindOneRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UserResponse) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public findAll(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: users_pb.UsersResponse) => void): grpc.ClientUnaryCall;
    public findAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UsersResponse) => void): grpc.ClientUnaryCall;
    public findAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UsersResponse) => void): grpc.ClientUnaryCall;
    public findOne(request: users_pb.UserFindOneRequest, callback: (error: grpc.ServiceError | null, response: users_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public findOne(request: users_pb.UserFindOneRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public findOne(request: users_pb.UserFindOneRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UserResponse) => void): grpc.ClientUnaryCall;
}
