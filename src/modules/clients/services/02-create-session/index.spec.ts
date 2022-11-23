import { describe, expect, test, beforeEach, vi } from 'vitest'
import { CreateSession } from '.'
import { ClientRepository } from '../../../../data/client-repository'
import { InMemoryClientRepository } from '../../../../data/in-memory-repositories/client-repository'
import { Client } from '../../../../models/client'
import { AppError } from '../../../../providers/AppError'
import { FakeTokenProvider } from '../../../../providers/fakes/fake-token-provider'
import { TokenProvider } from '../../../../providers/Token'
import { CreateSessionDTO } from '../../dtos/create-sesion-dto'

let genericError: string = 'Invalid email or password'
let fakeRequest: CreateSessionDTO
let sut: CreateSession
let fakeClientRepository: ClientRepository = new InMemoryClientRepository()
let fakeTokenProvider: TokenProvider = new FakeTokenProvider()


const fakeClient = () => {
    const client = new Client()
    client.id = 1
    client.email = 'jonh.doe@mail.com',
        client.password = '123456'
    return client
}

describe('UseCase: Create Session', () => {
    beforeEach(() => {
        sut = new CreateSession(fakeClientRepository, fakeTokenProvider)
        fakeRequest = {
            email: 'jonh.doe@mail.com',
            password: '123456'
        }
    })
    test('Deve retornar um erro caso o email ou password sejam nulos',
        async () => {
            fakeRequest.email = ''
            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result.message).toEqual(genericError)
        })
    test('Deve retornar um erro caso a senha tenha menos de 6 digitos',
        async () => {
            fakeRequest.password = '12345'
            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result.message).toEqual(genericError)
        })
    test('Deve retornar um erro caso não seja encontrado um cliente com o email fornecido',
        async () => {
            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result.message).toEqual(genericError)
        })
    test('Deve retornar um erro caso a senha fornecida não bata com a senha do cliente',
        async () => {
            fakeRequest.password = '1234567'
            vi.spyOn(fakeClientRepository, 'findByEmail').mockImplementationOnce(async () => fakeClient())

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result.message).toEqual(genericError)
        })
    test('Deve retonar um token',
        async () => {
            vi.spyOn(fakeClientRepository, 'findByEmail').mockImplementationOnce(async () => fakeClient())
            const result = await sut.execute(fakeRequest) as any
            expect(result).toEqual('fake_token')
        })
})