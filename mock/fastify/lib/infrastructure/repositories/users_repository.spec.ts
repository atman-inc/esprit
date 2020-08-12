import { UsersRepository } from './users_repository'
import { User } from '../../domain/user.entity'
import server from '../../server'
import { getRepository } from 'typeorm'

describe('UsersRepository', () => {
    beforeAll(async () => {
        await server.connectionDatabase.create()
    })
    afterEach(async() => {
        const connection = await server.connectionDatabase.get()
        await connection.synchronize(true)
    })
    afterAll(async () => {
        await server.connectionDatabase.close()
    })

    describe('#findAll', () => {
        it('users return', async () => {
            const dbRepo = getRepository(User)
            const user1 = new User
            user1.name = 'Taro'
            user1.age = 18
            const user2 = new User
            user2.name = 'Hanako'
            user2.age = 25

            const createUsers = await dbRepo.save([user1, user2])

            const repo = new UsersRepository(dbRepo)
            const users = await repo.findAll()

            expect(users.length).toBe(2)
            expect(users).toEqual(createUsers)
        })
    })

    describe('#insert', () => {
        it('new user return', async () => {
            const dbRepo = getRepository(User)
            const repo = new UsersRepository(dbRepo)
            const newUser = await repo.insert('Hoge', 40)
            const users = await repo.findAll()

            expect(users.length).toBe(1)
            expect(users[0]).toEqual(newUser)
        })
    })
})