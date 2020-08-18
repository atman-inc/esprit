// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var users_pb = require('./users_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_UserCreateRequest(arg) {
  if (!(arg instanceof users_pb.UserCreateRequest)) {
    throw new Error('Expected argument of type users.UserCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_UserCreateRequest(buffer_arg) {
  return users_pb.UserCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_UserFindOneRequest(arg) {
  if (!(arg instanceof users_pb.UserFindOneRequest)) {
    throw new Error('Expected argument of type users.UserFindOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_UserFindOneRequest(buffer_arg) {
  return users_pb.UserFindOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_UserResponse(arg) {
  if (!(arg instanceof users_pb.UserResponse)) {
    throw new Error('Expected argument of type users.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_UserResponse(buffer_arg) {
  return users_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_UsersResponse(arg) {
  if (!(arg instanceof users_pb.UsersResponse)) {
    throw new Error('Expected argument of type users.UsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_UsersResponse(buffer_arg) {
  return users_pb.UsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  findAll: {
    path: '/users.Users/FindAll',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: users_pb.UsersResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_users_UsersResponse,
    responseDeserialize: deserialize_users_UsersResponse,
  },
  findOne: {
    path: '/users.Users/FindOne',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserFindOneRequest,
    responseType: users_pb.UserResponse,
    requestSerialize: serialize_users_UserFindOneRequest,
    requestDeserialize: deserialize_users_UserFindOneRequest,
    responseSerialize: serialize_users_UserResponse,
    responseDeserialize: deserialize_users_UserResponse,
  },
  create: {
    path: '/users.Users/Create',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserCreateRequest,
    responseType: users_pb.UserResponse,
    requestSerialize: serialize_users_UserCreateRequest,
    requestDeserialize: deserialize_users_UserCreateRequest,
    responseSerialize: serialize_users_UserResponse,
    responseDeserialize: deserialize_users_UserResponse,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
