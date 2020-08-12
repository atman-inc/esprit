import { UsersRepository } from './users_repository'
import { User } from "../../domain/user";

describe('#findAll', () => {
    const repository = new UsersRepository()

    test('two users return', () => {
        const users = repository.findAll()
    })
})

describe('#insert', () => {
    const repository = new UsersRepository()

    test('new user return', () => {
    })
})