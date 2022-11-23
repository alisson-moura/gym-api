import { faker } from "@faker-js/faker";
import { describe, test, beforeEach, vi, expect } from "vitest";
import { ConfirmAppointment } from ".";
import { InMemoryAppointmentRepository } from "../../../../data/in-memory-repositories/appoitment-repository";
import { Appointment } from "../../../../models/appointment";
import { Client } from "../../../../models/client";
import { AppError } from "../../../../providers/AppError";
import { FakeDateProvider } from "../../../../providers/fakes/fake-date-provider";
import { FakeTokenProvider } from "../../../../providers/fakes/fake-token-provider";
import { ConfirmAppointmentDTO } from "../../dtos/confirm-appointment-dto";

let sut: ConfirmAppointment
let fakeRequest: ConfirmAppointmentDTO
const fakeAppointmentRepository = new InMemoryAppointmentRepository()
const fakeDateProvider = new FakeDateProvider()
const fakeTokenProvider = new FakeTokenProvider()

const factoryFakeClient = () => {
    const item = new Client()
    item.birthDate = faker.date.birthdate()
    item.email = faker.internet.email()
    item.id = 1
    item.name = faker.name.fullName()
    item.gender = 'm'
    item.status = 'active'
    return item
}

const factoryFakeAppointment = (start: number, end: number): Appointment => {
    const item = new Appointment()
    item.id = 1
    item.client = factoryFakeClient()
    item.status = 'pendente'
    item.createdAt = new Date()
    item.date = faker.date.between(new Date().setHours(start, 0, 0, 0), new Date().setHours(end, 0, 0))
    return item
}


describe('UseCase: Confirm Appointment', () => {
    beforeEach(() => {
        sut = new ConfirmAppointment(fakeAppointmentRepository, fakeDateProvider, fakeTokenProvider)
        fakeRequest = {
            appointmentId: 1,
            clientId: 1,
            token: 'fake_token'
        }
    })
    test('Deve retornar um erro caso não seja encontrado um agendamento válido', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => undefined)

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Invalid appointment id')
    })
    test('Deve retornar um erro caso o client fornecido seja diferente do client do appointment', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => factoryFakeAppointment(7, 8))
        fakeRequest.clientId = 2
        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Invalid client id')
    })
    test('Deve retornar um erro caso o agendamento seja de um horário anterior ao atual', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementation(async () => factoryFakeAppointment(7, 8))
        vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(() => true)

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('The appointment is invalid because it has already passed')
    })
    test('Deve retornar um erro caso o token fornecido sejá inválido', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementation(async () => factoryFakeAppointment(7, 8))
        fakeRequest.token = 'invalid_token'

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Provided token is invalid')
    })
    test('Deve chamar o método confirmAppointment do repositório de Appointments com os valores corretos', async () => {
        const spy = vi.spyOn(fakeAppointmentRepository, 'confirm')

        await sut.execute(fakeRequest)
        expect(spy).toHaveBeenCalledWith({ id: 1 })
    })
    test('Deve retornar o agendamento atualizado', async () => {
        vi.spyOn(fakeAppointmentRepository, 'confirm').mockImplementationOnce(async () => factoryFakeAppointment(7, 8))

        const result = await sut.execute(fakeRequest)
        expect(result).toBeInstanceOf(Appointment)
    })
})