import { UsersRepository } from './users_repository'
import { User } from "../../domain/user";

describe('#findAll', () => {
    const repository = new UsersRepository()

    test('two users return', () => {
        const users = repository.findAll()

        expect(users.length).toBe(2)
        expect(users).toEqual([new User("Taro", 18), new User("Hanako", 24)])
    })
})

describe('#insert', () => {
    const repository = new UsersRepository()

    test('new user return', () => {
        const user = repository.insert('Yamada', 10)

        expect(user).toEqual(new User('Yamada', 10))
    })
})