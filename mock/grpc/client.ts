import grpc from 'grpc'
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as users_grpc_pb from './lib/proto/users_grpc_pb'
import * as users_pb from './lib/proto/users_pb'

const client = new users_grpc_pb.UsersClient(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure(),
  );

const req = new google_protobuf_empty_pb.Empty()

client.findAll(req, (error, result) => {
    if (error) console.log('Error: ', error);
    else console.log(result.toObject());
})