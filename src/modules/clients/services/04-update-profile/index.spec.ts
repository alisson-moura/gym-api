import { describe, expect, test, beforeEach, vi } from 'vitest'
import { UpdateAccount } from '.'
import { ClientRepository } from '../../../../data/client-repository'
import { InMemoryClientRepository } from '../../../../data/in-memory-repositories/client-repository'
import { Client } from '../../../../models/client'
import { AppError } from '../../../../providers/AppError'
import { UpdateAccountDTO } from '../../dtos/update-account-dto'

let sut: UpdateAccount
let fakeRequest: UpdateAccountDTO
let fakeClientRepository: ClientRepository = new InMemoryClientRepository()

const fakeClient = () => {
    const client = new Client()
    client.id = 1
    client.email = 'jonh.doe@mail.com'
    return client
}

describe('UseCase: Update Account', () => {
    beforeEach(() => {
        sut = new UpdateAccount(fakeClientRepository)
        fakeRequest = {
            id: 1,
            name: 'Jonh Doe',
            email: 'jonh@mail.com',
            gender: 'm',
        }
    })
    test('Deve retornar um erro caso o valor de um ou mais desses campos [id, name, email, gender] sejam nulos',
        async () => {
            fakeRequest.name = ''
            const result = await sut.execute(fakeRequest)
            expect(result).toBeInstanceOf(AppError)
        })
    test('Deve retornar um erro caso os valores de [gender] sejam diferentes de "m" ou "f"',
        async () => {
            fakeRequest.gender = 'a'
            const result = await sut.execute(fakeRequest) as any
            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('Field gender accept values: m or f')
        })
    test('Deve retornar um erro caso não seja encontrado um usuário com o [id] fornecido',
        async () => {
            vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => undefined)

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('Invalid client id')
        })
    test('Deve retornar um erro caso o [email] já esteja em uso por outro cliente diferente do cliente informado',
        async () => {
            const updateClient = fakeClient()
            const anotherClient = fakeClient()
            anotherClient.id = 2

            vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => updateClient)
            vi.spyOn(fakeClientRepository, 'findByEmail').mockImplementationOnce(async () => anotherClient)

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('Email in use by another user')
        })
    test('Deve retornar um erro caso o [badge] seja fornecido  e já esteja em uso por outro cliente diferente do cliente informado',
        async () => {
            const updateClient = fakeClient()
            const anotherClient = fakeClient()
            anotherClient.id = 2
            anotherClient.badge = 123
            fakeRequest.badge = 123

            vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => updateClient)
            vi.spyOn(fakeClientRepository, 'findByBadge').mockImplementationOnce(async () => anotherClient)

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('Badge in use by another user')
        })
    test('Deve retornar os dados do client atualizado',
        async () => {
            vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => fakeClient())
            vi.spyOn(fakeClientRepository, 'update').mockImplementationOnce(async () => fakeClient())

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(Client)
        })
})