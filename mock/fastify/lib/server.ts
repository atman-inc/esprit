import { createConnection, Connection, getConnection } from "typeorm";

const server = {
    connectionDatabase: {
        async create(): Promise<Connection> {
            const connection = await createConnection()
            return connection
        },
        async close() {
            await getConnection().close()
        }
    } 
}

export default server