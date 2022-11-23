import { describe, expect, test, beforeEach, vi } from 'vitest'
import { ShowProfile } from '.'
import { ClientRepository } from '../../../../data/client-repository'
import { InMemoryClientRepository } from '../../../../data/in-memory-repositories/client-repository'
import { Client } from '../../../../models/client'
import { AppError } from '../../../../providers/AppError'

let sut: ShowProfile
let fakeRequest: { id: number }
let fakeClientRepository: ClientRepository = new InMemoryClientRepository()

const fakeClient = () => {
    const client = new Client()
    client.id = 1
    client.email = 'jonh.doe@mail.com'
    return client
}

describe('UseCase: Show Profile', () => {
    beforeEach(() => {
        sut = new ShowProfile(fakeClientRepository)
        fakeRequest = { id: 1 }
    })
    test('Deve retornar um erro caso não encotre um cliente com o id fornecido',
        async () => {
            vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => undefined)
            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result.message).toEqual('Invalid client id')
        })
        test('Deve retornar um client',
        async () => {
            vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => fakeClient())
            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(Client)
        })
})