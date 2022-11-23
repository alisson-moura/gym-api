import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { NewAppointment } from ".";
import { InMemoryAppointmentRepository } from "../../../../data/in-memory-repositories/appoitment-repository";
import { InMemoryClientRepository } from "../../../../data/in-memory-repositories/client-repository";
import { Appointment } from "../../../../models/appointment";
import { Client } from "../../../../models/client";
import { AppError } from "../../../../providers/AppError";
import { FakeDateProvider } from "../../../../providers/fakes/fake-date-provider";
import { CreateAppointmentDTO } from "../../dtos/create-appointment-dto";


const factoryFakesAppointments = (amount: number, start: number, end: number): Appointment[] => {
    const appointments: Appointment[] = []
    for (let i = 0; i <= amount; i++) {
        const item = new Appointment()
        item.id = i
        item.status = 'pendente'
        item.createdAt = new Date()
        item.date = faker.date.between(new Date().setHours(start, 0, 0, 0), new Date().setHours(end, 0, 0))
        appointments.push(item)
    }
    return appointments
}

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

let sut: NewAppointment
const fakeAppointmentRepository = new InMemoryAppointmentRepository()
const fakeClientRepository = new InMemoryClientRepository()
const fakeDateProvider = new FakeDateProvider()
let fakeRequest: CreateAppointmentDTO


describe('Use Case: New Appointment', () => {

    beforeEach(() => {
        sut = new NewAppointment(fakeAppointmentRepository, fakeClientRepository, fakeDateProvider)
        fakeRequest = {
            clientId: 1,
            date: new Date(),
            hour: new Date().getHours() + 1
        }
    })

    test('Deve retornar um erro caso a data fornecida seja anterior a atual', async () => {
        vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(() => true)
        fakeRequest.date = faker.date.recent()
        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Only future dates are accepted')
    })
    test('Deve retornar um erro caso o horario informado seja anterior ao horario atual', async () => {
        fakeRequest.hour = new Date().getHours() - 1
        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Hour not available for appointment')
    })
    test('Deve retornar um erro caso o horario informado já possua mais de 20 agendamentos', async () => {
        vi.spyOn(fakeAppointmentRepository, 'findAll').mockImplementationOnce(async () =>
            factoryFakesAppointments(20, new Date().getHours() + 1, new Date().getHours() + 2))

        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Hour not available for appointment')
    })
    test('Deve retornar um erro caso o id do client informado seja inválido', async () => {
        vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(async () => undefined)

        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Invalid client id')
    })
    test('Deve retornar um erro caso o client tenha um agendamento pendente posterior a data atual', async () => {
        vi.spyOn(fakeClientRepository, 'findById').mockImplementation(async () => factoryFakeClient())
        vi.spyOn(fakeAppointmentRepository, 'findByClientId').mockImplementationOnce(async () =>
            factoryFakesAppointments(1, new Date().getHours() + 1, new Date().getHours() + 2))
        vi.spyOn(fakeDateProvider, 'isAfter').mockImplementationOnce(() => true)

        fakeRequest.date = new Date()
        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('An appointment already exists for this client')
    })
    test('Deve retornar um erro caso o client possua um agendamento "pendente" com menos de 48h a partir da data do agendamento', async () => {
        vi.spyOn(fakeClientRepository, 'findById').mockImplementation(async () => factoryFakeClient())
        vi.spyOn(fakeAppointmentRepository, 'findByClientId').mockImplementationOnce(async () => {
            const appointments: Appointment[] = []
            const item = new Appointment()
            item.id = 1
            item.status = 'pendente'
            item.createdAt = new Date()
            item.date = faker.date.recent(1, new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getHours()))
            appointments.push(item)
            return appointments
        })
        vi.spyOn(fakeDateProvider, 'differenceInHours').mockImplementationOnce(() => 24)

        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Client is not able to make new appointments')
    })
    test('Deve retornar um novo agendamento', async () => {
        vi.spyOn(fakeClientRepository, 'findById').mockImplementation(async () => factoryFakeClient())
        vi.spyOn(fakeAppointmentRepository, 'findByClientId').mockImplementationOnce(async () => [])
        vi.spyOn(fakeAppointmentRepository, 'create').mockImplementationOnce(async () => new Appointment())
        vi.spyOn(fakeDateProvider, 'differenceInHours').mockImplementationOnce(() => 49)

        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(Appointment)
    })
})