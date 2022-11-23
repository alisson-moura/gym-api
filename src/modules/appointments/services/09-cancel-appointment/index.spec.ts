import { faker } from "@faker-js/faker";
import { describe, test, beforeEach, vi, expect } from "vitest";
import { CancelAppointment } from ".";
import { InMemoryAppointmentRepository } from "../../../../data/in-memory-repositories/appoitment-repository";
import { Appointment } from "../../../../models/appointment";
import { Client } from "../../../../models/client";
import { AppError } from "../../../../providers/AppError";
import { FakeDateProvider } from "../../../../providers/fakes/fake-date-provider";
import { CancelAppointmentDTO } from "../../dtos/cancel-appointment-dto";


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



let sut: CancelAppointment
const fakeDateProvider = new FakeDateProvider()
const fakeAppointmentRepository = new InMemoryAppointmentRepository()
let fakeRequest: CancelAppointmentDTO

describe('Use Case: Cancel Appointment', () => {
    beforeEach(() => {
        sut = new CancelAppointment(fakeAppointmentRepository, fakeDateProvider)
        fakeRequest = {
            appointmentId: 1,
            clientId: 1,
            comments: 'canceled'
        }
    })
    test('Deve retornar um erro caso não seja encontrado um agendamento com o id informado', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => undefined)

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Invalid appointment id')
    })
    test('Deve retornar um erro caso o agendamento encontrado não tenha o status de pendente', async () => {
        const app = factoryFakeAppointment(7, 20)
        app.status = 'concluido'
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => app)

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Invalid appointment id')
    })
    test('Deve retornar um erro caso a data do agendamento seja anterior a data atual', async () => {
        const app = factoryFakeAppointment(7, 20)
        app.date = faker.date.recent()
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => app)
        vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(() => true)

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Past appointments cannot be canceled')
    })
    test('Deve retornar um erro caso o agendamento não seja do cliente informado', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => factoryFakeAppointment(7, 20))
        fakeRequest.clientId = 2

        const result = await sut.execute(fakeRequest) as AppError

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('This appointment does not belong to the informed customer')
    })
    test('Deve retornar o agendamento cancelado', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(async () => factoryFakeAppointment(7, 20))
        vi.spyOn(fakeAppointmentRepository, 'cancel').mockImplementationOnce(async () => factoryFakeAppointment(7, 20))
        const result = await sut.execute(fakeRequest)
        expect(result).toBeInstanceOf(Appointment)
    })
})