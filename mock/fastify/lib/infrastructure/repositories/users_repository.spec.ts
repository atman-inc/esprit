import { UsersRepository } from './users_repository'
import { User } from '../../domain/user.entity'
import server from '../../server'

describe('UsersRepository', () => {
    beforeAll(async () => {
        await server.connectionDatabase.create()
    })
    afterAll(async () => {
        await server.connectionDatabase.close()
    })

    describe('#findAll', () => {
        it('two users return', async () => {
        })
    })

    describe('#insert', () => {
        test('new user return', () => {
        })
    })
})