import grpc from 'grpc'
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as users_grpc_pb from './lib/proto/users_grpc_pb'
import * as users_pb from './lib/proto/users_pb'

const client = new users_grpc_pb.UsersClient(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure(),
  );

const req1 = new users_pb.UserCreateRequest()
req1.setName('Taro')
req1.setAge(20)
client.create(req1, (error, result) => {
    if (error) console.log('Error: ', error);
    else console.log(result.toObject());
})

const req2 = new google_protobuf_empty_pb.Empty()
client.findAll(req2, (error, result) => {
    if (error) console.log('Error: ', error);
    else console.log(result.toObject());
})

const req3 = new users_pb.UserFindOneRequest()
req3.setId(1)
client.findOne(req3, (error, result) => {
    if (error) console.log('Error: ', error);
    else console.log(result.toObject());
})