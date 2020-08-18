import * as grpc from 'grpc';
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as users_grpc_pb from '../../proto/users_grpc_pb'
import * as users_pb from '../../proto/users_pb'
import { container } from 'tsyringe';
import { UsersUsecase } from '../../application/usecases/users.usecase';

export class UsersService implements users_grpc_pb.IUsersServer {
    async findAll(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<users_pb.UsersResponse>) {
        const usecase = container.resolve(UsersUsecase);
        const users = await usecase.findAll()

        const usersResponse = users.map((u) => {
            const user = new users_pb.UserResponse()
            user.setId(u.id)
            user.setName(u.name)
            user.setAge(u.age)
            user.setIsactive(u.isActivate)

            return user
        })

        const response = new users_pb.UsersResponse()
        response.setUserList(usersResponse)

        callback(null, response)
    }

    findOne(call: grpc.ServerUnaryCall<users_pb.UserFindOneRequest>, callback: grpc.sendUnaryData<users_pb.UserResponse>) {
    }
}