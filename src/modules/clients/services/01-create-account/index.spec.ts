import { describe, expect, test, beforeEach, vi } from 'vitest'
import { CreateAccount } from '.'
import { ClientRepository } from '../../../../data/client-repository'
import { InMemoryClientRepository } from '../../../../data/in-memory-repositories/client-repository'
import { Client } from '../../../../models/client'
import { AppError } from '../../../../providers/AppError'
import { CreateAccountDTO } from '../../dtos/create-client-dto'

let sut: CreateAccount
let fakeRequest: CreateAccountDTO
let fakeClientRepository: ClientRepository = new InMemoryClientRepository()

describe('UseCase: Create Account', () => {
    beforeEach(() => {
        sut = new CreateAccount(fakeClientRepository)
        fakeRequest = {
            name: 'Jonh Doe',
            email: 'jonh@mail.com',
            password: '123456',
            confirmPassword: '123456',
            gender: 'm',
            company: 'funfarme'
        }
    })
    test('Deve retornar um erro caso o valor de um ou mais desses campos [name, email, password, confirmPassword, gender] sejam nulos',
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
    test('Deve retornar um erro caso o tamanho de [password] seja menor que 6',
        async () => {
            fakeRequest.password = '12345'
            const result = await sut.execute(fakeRequest) as any
            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('password field requires at least 6 characters')
        })
    test('Deve retornar um erro caso o [confirmPassword] possua um valor diferende de [password]',
        async () => {
            fakeRequest.confirmPassword = '12345'

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('These fields have different values: password / confirmPassword')
        })
    test('Deve retornar um erro caso o [email] já esteja em uso por outro cliente',
        async () => {
            const fakeClient = new Client()
            vi.spyOn(fakeClientRepository, 'findByEmail').mockImplementationOnce(async () => fakeClient)

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('Email in use by another user')
        })
    test('Deve retornar um erro caso o [badge] seja fornecido  e já esteja em uso por outro cliente',
        async () => {
            fakeRequest.badge = 123
            const fakeClient = new Client()
            vi.spyOn(fakeClientRepository, 'findByBadge').mockImplementationOnce(async () => fakeClient)

            const result = await sut.execute(fakeRequest) as any

            expect(result).toBeInstanceOf(AppError)
            expect(result['message']).toEqual('Badge in use by another user')
         })
    test('Deve chamar o metódo create do repositório de clients com os valores corretos',
        async () => { 
            const spy = vi.spyOn(fakeClientRepository, 'create')
            await sut.execute(fakeRequest)
            expect(spy).toHaveBeenCalledWith(fakeRequest)
        })
})