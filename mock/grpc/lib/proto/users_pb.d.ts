// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class UserFindOneRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): UserFindOneRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserFindOneRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserFindOneRequest): UserFindOneRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserFindOneRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserFindOneRequest;
    static deserializeBinaryFromReader(message: UserFindOneRequest, reader: jspb.BinaryReader): UserFindOneRequest;
}

export namespace UserFindOneRequest {
    export type AsObject = {
        id: number,
    }
}

export class UserCreateRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): UserCreateRequest;

    getAge(): number;
    setAge(value: number): UserCreateRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserCreateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserCreateRequest): UserCreateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserCreateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserCreateRequest;
    static deserializeBinaryFromReader(message: UserCreateRequest, reader: jspb.BinaryReader): UserCreateRequest;
}

export namespace UserCreateRequest {
    export type AsObject = {
        name: string,
        age: number,
    }
}

export class UsersResponse extends jspb.Message { 
    clearUserList(): void;
    getUserList(): Array<UserResponse>;
    setUserList(value: Array<UserResponse>): UsersResponse;
    addUser(value?: UserResponse, index?: number): UserResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UsersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UsersResponse): UsersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UsersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UsersResponse;
    static deserializeBinaryFromReader(message: UsersResponse, reader: jspb.BinaryReader): UsersResponse;
}

export namespace UsersResponse {
    export type AsObject = {
        userList: Array<UserResponse.AsObject>,
    }
}

export class UserResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): UserResponse;

    getName(): string;
    setName(value: string): UserResponse;

    getAge(): number;
    setAge(value: number): UserResponse;

    getIsactive(): boolean;
    setIsactive(value: boolean): UserResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserResponse;
    static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
    export type AsObject = {
        id: number,
        name: string,
        age: number,
        isactive: boolean,
    }
}
