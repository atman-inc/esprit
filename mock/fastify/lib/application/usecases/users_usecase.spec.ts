import { UsersUsecase } from "./users_usecase"
import { UsersRepository } from "../../infrastructure/repositories/users_repository"
import { User } from "../../domain/user.entity"

jest.mock('../../infrastructure/repositories/users_repository')
const UsersRepositoryMock = UsersRepository as jest.Mock

describe('UsersUsecase', () => {

    beforeEach(() => {
        UsersRepositoryMock.mockClear()
    })

    describe('findAll', () => {
        const user1 = new User
        user1.name = 'Taro'
        user1.age = 18
        const user2 = new User
        user2.name = 'Hanako'
        user2.age = 25

        it('users return', async () => {
            UsersRepositoryMock.mockImplementationOnce(() => {
                return {
                    findAll: (): Promise<User[]> => {
                        return Promise.resolve([user1, user2])
                    }
                }
            })

            const repo = new UsersRepositoryMock
            const usecase = new UsersUsecase(repo)
            const users = await usecase.findAll()

            expect(users).toHaveLength(2)
            expect(users).toEqual([user1, user2])
        })
    })

    describe('create', () => {
        it('new user return', async () => {
            const user = new User
            user.name = 'Hoge'
            user.age = 99

            UsersRepositoryMock.mockImplementationOnce(() => {
                return {
                    insert: (): Promise<User> => {
                        return Promise.resolve(user)
                    }
                }
            })

            const repo = new UsersRepositoryMock
            const usecase = new UsersUsecase(repo)
            const newUser = await usecase.create('Hoge', 99)

            expect(newUser).toEqual(user)
        })
    })
})