import { Model, PartitionKey } from "@shiftcoders/dynamo-easy";

@Model({ tableName: "users" })
export class User {
  @PartitionKey()
  id: string;
  name: string;
  age: number;
}
